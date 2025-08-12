# Firebase Hosting এ Deploy করার পদ্ধতি

## ১. Firebase CLI ইনস্টল করুন

```bash
npm install -g firebase-tools
```

## ২. Firebase Login

```bash
firebase login
```

## ৩. Firebase Project তৈরি করুন

1. [Firebase Console](https://console.firebase.google.com) এ যান
2. "Create a project" ক্লিক করুন
3. Project name: `somiti-manager` (বা যেকোনো নাম)
4. Google Analytics disable করুন (optional)

## ৪. Project Initialize করুন

```bash
# Build করুন
npm run build

# Firebase init
firebase init hosting

# যখন জিজ্ঞাসা করবে:
# ✓ Use an existing project → somiti-manager
# ✓ Public directory → dist
# ✓ Configure as single-page app → Yes
# ✓ Set up automatic builds → No
# ✓ Overwrite index.html → No
```

## ৫. Deploy করু���

```bash
firebase deploy
```

## ৬. Live URL

Deploy হওয়ার পর আপনার লাইভ URL হবে:
```
https://somiti-manager.web.app
```

## GitHub Actions দিয়ে Auto Deploy

`.github/workflows/firebase-deploy.yml` ফাইলে:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: somiti-manager
```
