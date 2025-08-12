#!/bin/bash

echo "🚀 সমিতি ম্যানেজার APK তৈরি করা হচ্ছে..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build web app
echo "🔨 Web app build করা হচ্ছে..."
npm run build

# Check if capacitor is initialized
if [ ! -f "capacitor.config.ts" ]; then
    echo "⚡ Capacitor initialize করা হচ্ছে..."
    npx cap init "সমিতি ��্যানেজার" "com.somitimanager.app"
fi

# Add android platform if not exists
if [ ! -d "android" ]; then
    echo "📱 Android platform যোগ করা হচ্ছে..."
    npx cap add android
fi

# Copy web assets
echo "📋 Web assets copy করা হচ্ছে..."
npx cap copy android

# Build debug APK
echo "🔧 Debug APK build করা হচ্ছে..."
cd android
chmod +x ./gradlew
./gradlew assembleDebug

echo ""
echo "✅ APK তৈরি সম্পন্ন!"
echo "📍 APK Location: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📱 এখন এই APK ফাইলটি আপনার ফোনে install করুন!"
echo "🔧 Production APK এর জন্য: npm run apk:release"
