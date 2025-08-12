# 📱 Android APK তৈরির পদ্ধতি

## ১. প্রয়োজনীয় সফটওয়্যার ইনস্টল

### Node.js Dependencies:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor/splash-screen @capacitor/status-bar
```

### Android Studio Setup:

1. **Android Studio** ডাউনলোড করুন: [developer.android.com](https://developer.android.com/studio)
2. **Android SDK** ইনস্টল করুন
3. **Java JDK 11+** ইনস্টল করুন

## ২. Build Process

```bash
# Web app build করুন
npm run build

# Capacitor initialize করুন
npx cap init "সমিতি ম্যানেজার" "com.somitimanager.app"

# Android platform যোগ করুন
npx cap add android

# Web assets copy করুন
npx cap copy android

# Android Studio তে খুলুন
npx cap open android
```

## ৩. Android Studio এ APK Build

1. **Android Studio** খুলবে
2. **Build → Generate Signed Bundle/APK** ক্লিক করুন
3. **APK** সিলেক্ট করুন
4. **Create new keystore** (প্রথমবার)
5. **Build** করুন

## ৪. Quick APK Build (Debug)

```bash
# Debug APK তৈরি করতে
cd android
./gradlew assembleDebug

# APK location:
# android/app/build/outputs/apk/debug/app-debug.apk
```

## ৫. App Icons & Splash Screen

### App Icon (1024x1024):

- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`

### Splash Screen:

- `android/app/src/main/res/drawable/splash.png`

## ৬. Permissions (android/app/src/main/AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## 🚀 One-Click Build Script

```bash
#!/bin/bash
echo "🔨 Building Somiti Manager APK..."

# Clean & build web app
npm run build

# Update capacitor
npx cap copy android
npx cap update android

# Build debug APK
cd android
./gradlew assembleDebug

echo "✅ APK Ready: android/app/build/outputs/apk/debug/app-debug.apk"
```

## 📋 APK তথ্য

- **নাম:** সমিতি ম্যানেজার
- **Package:** com.somitimanager.app
- **Version:** 1.0.0
- **Size:** ~10-15 MB
- **Minimum Android:** 5.0 (API 21)
- **Target Android:** 13 (API 33)

## 🔧 Features

✅ **Offline Work** - localStorage data
✅ **Native Feel** - Android navigation
✅ **Full Screen** - Immersive experience  
✅ **Auto Updates** - Web content sync
✅ **Bangladeshi Fonts** - Perfect Bengali support

## 📱 Testing

APK তৈরি হওয়ার পর:

1. ফোনে **Unknown Sources** enable করুন
2. APK ফাইল install করুন
3. অ্যাপ খুলুন ও test করুন

---

**Note:** Production release এর জন্য Google Play Console এ keystore দিয়ে signed APK আপলোড করতে হবে।
