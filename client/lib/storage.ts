// Simple storage service using IndexedDB with localStorage fallback
// Provides JSON get/set helpers to persist large data reliably across deployments

const DB_NAME = "somitiManagerDB";
const DB_VERSION = 1;
const STORE = "kv";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      return reject(new Error("IndexedDB not available"));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error("IndexedDB open error"));
  });
}

async function idbGet<T = unknown>(key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return await new Promise<T | null>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const store = tx.objectStore(STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as T) ?? null);
      req.onerror = () => reject(req.error || new Error("IndexedDB get error"));
    });
  } catch {
    return null;
  }
}

async function idbSet<T = unknown>(key: string, value: T): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      const req = store.put(value as any, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error || new Error("IndexedDB put error"));
    });
  } catch {
    // ignore
  }
}

async function idbRemove(key: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const store = tx.objectStore(STORE);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () =>
        reject(req.error || new Error("IndexedDB delete error"));
    });
  } catch {
    // ignore
  }
}

function safeParse<T>(str: string | null): T | null {
  if (!str) return null;
  try {
    return JSON.parse(str) as T;
  } catch {
    return null;
  }
}

export const storage = {
  // Async JSON helpers (primary API)
  async get<T = unknown>(key: string): Promise<T | null> {
    // Prefer IndexedDB
    const idbVal = await idbGet<string>(key);
    if (idbVal !== null && idbVal !== undefined) {
      try {
        return typeof idbVal === "string"
          ? (JSON.parse(idbVal) as T)
          : (idbVal as any as T);
      } catch {
        return idbVal as any as T;
      }
    }
    // Fallback to localStorage
    return safeParse<T>(
      typeof localStorage !== "undefined" ? localStorage.getItem(key) : null,
    );
  },

  async set<T = unknown>(key: string, value: T): Promise<void> {
    const serialized =
      typeof value === "string" ? value : JSON.stringify(value);
    // Best-effort mirror into localStorage for small flags (auth etc.)
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, serialized);
      }
    } catch {
      // ignore quota errors
    }
    // Write to IndexedDB for larger capacity
    await idbSet<string>(key, serialized);
  },

  async remove(key: string): Promise<void> {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch {
      // ignore
    }
    await idbRemove(key);
  },

  // Convenience array helpers
  async getArray<T = unknown>(key: string): Promise<T[]> {
    const v = await this.get<T[]>(key);
    return Array.isArray(v) ? v : [];
  },
  async push<T = unknown>(key: string, item: T): Promise<T[]> {
    const arr = await this.getArray<T>(key);
    const next = [...arr, item];
    await this.set(key, next);
    return next;
  },
};
