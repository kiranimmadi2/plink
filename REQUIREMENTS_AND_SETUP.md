# 🔧 Requirements and Setup Guide for Google Sign-In

## ✅ Issues Fixed

### 1. Code Fixes Applied
- ✅ **Fixed import path** in `src/screens/LoginScreen.tsx:169`
- ✅ **Separated auth services** - Mock service for email/password, Firebase service for Google Sign-In
- ✅ **Fixed navigation** - Changed from `replace` to `navigate` for better UX
- ✅ **Added ESLint config** - Modern ESLint v9+ configuration with React Native support

### 2. Current Project Status
- ✅ **Dependencies installed** - All Firebase and Google Sign-In packages ready
- ✅ **Firebase configuration** - Basic setup completed
- ✅ **UI implementation** - Google Sign-In button integrated
- ⚠️ **Requires additional setup** - See requirements below

---

## 📋 Requirements from Firebase Console

### Step 1: Firebase Project Setup
You need to provide/configure the following in **Firebase Console**:

#### A. Authentication Providers
1. **Go to Firebase Console** → Authentication → Sign-in method
2. **Enable Google Sign-In provider**
3. **Add authorized domains**:
   - `localhost` (for development)
   - Your production domain (when deploying)

#### B. Project Settings
1. **Go to Project Settings** → General
2. **Verify these values match your project**:
   - Project ID: `supper-8cb60`
   - Package name: `com.supperios`

### Step 2: Android Configuration
You need to get these files from **Firebase Console**:

#### A. SHA-1 Fingerprints (CRITICAL)
1. **Generate debug SHA-1**:
   ```bash
   cd android
   ./gradlew signingReport
   ```
   
2. **Add SHA-1 to Firebase Console**:
   - Go to Project Settings → Your apps → Android app
   - Click "Add fingerprint"
   - Paste the SHA1 value from the signingReport

#### B. google-services.json (Already added ✅)
- File location: `android/app/google-services.json`
- Status: ✅ Already in correct location

### Step 3: Google Cloud Console Setup
You need to configure these in **Google Cloud Console**:

#### A. OAuth 2.0 Client IDs
1. **Go to Google Cloud Console** → APIs & Services → Credentials
2. **Verify these OAuth clients exist**:
   - **Android client**: For package `com.supperios`
   - **Web client**: For web domain
   
3. **Web Client ID verification**:
   - Current ID: `936008982768-htlfcbthj1crbpbvh13pn75f2jegc9ia.apps.googleusercontent.com`
   - Should be added to Firebase authentication

#### B. Enable APIs
Ensure these APIs are enabled:
- ✅ Google Sign-In API
- ✅ Firebase Authentication API

---

## 🔑 Configuration Files You Need to Provide

### 1. Updated google-services.json
**Location**: `android/app/google-services.json`
**Current Status**: ✅ File exists, but verify it has latest SHA-1 fingerprints

**To update**:
1. Go to Firebase Console → Project Settings
2. Download latest `google-services.json`
3. Replace existing file

### 2. For iOS (Future)
**Location**: `ios/GoogleService-Info.plist`
**Status**: ❌ Not implemented yet (Android-first approach)

**When adding iOS**:
1. Download `GoogleService-Info.plist` from Firebase Console
2. Add iOS configuration to `app.json`

---

## 🚀 Testing Instructions

### Option 1: Expo Development Build (Recommended)
```bash
# Install dependencies
npm install

# Run on Android device/emulator
npx expo run:android

# Test Google Sign-In button
# Should work with real Google authentication
```

### Option 2: Expo Go (Limited functionality)
```bash
npm start
# Press 'a' for Android or scan QR code
# Note: Google Sign-In may not work fully in Expo Go
```

---

## ⚠️ Common Issues and Solutions

### Issue 1: "Developer Error" during Google Sign-In
**Cause**: Missing or incorrect SHA-1 fingerprint
**Solution**: 
1. Generate SHA-1: `cd android && ./gradlew signingReport`
2. Add to Firebase Console
3. Download new `google-services.json`
4. Rebuild app

### Issue 2: "Network Error" 
**Cause**: 
- APIs not enabled in Google Cloud Console
- Incorrect OAuth client configuration
**Solution**: Verify Google Cloud Console setup

### Issue 3: Authentication fails silently
**Cause**: Package name mismatch
**Solution**: Verify `com.supperios` matches in:
- `app.json` → android.package
- Firebase Console
- Google Cloud Console OAuth client

### Issue 4: Build errors
**Solution**:
```bash
# Clear cache and reinstall
npx expo start --clear
npm install

# For native build issues
cd android && ./gradlew clean
```

---

## 📝 Next Steps for You

### Immediate Actions Required:
1. **Generate SHA-1 fingerprint**:
   ```bash
   cd android && ./gradlew signingReport
   ```

2. **Add SHA-1 to Firebase Console**:
   - Project Settings → Your apps → Android
   - Add fingerprint

3. **Verify Google Cloud Console**:
   - Check OAuth client IDs exist
   - Verify APIs are enabled

4. **Test the app**:
   ```bash
   npx expo run:android
   ```

### Optional Improvements:
1. **Add iOS support** (download GoogleService-Info.plist)
2. **Set up production SHA-1** for release builds
3. **Configure custom URL schemes** for better deep linking

---

## 📊 Current Architecture

### Authentication Flow:
1. **Email/Password**: Uses mock service (`src/services/AuthService.ts`)
2. **Google Sign-In**: Uses Firebase service (`services/authService.js`)
3. **Navigation**: Unified flow to Main screen after authentication

### File Structure:
```
├── services/
│   ├── authService.js          # Firebase Google Sign-In
│   └── firebaseConfig.js       # Firebase configuration
├── src/services/
│   └── AuthService.ts          # Mock email/password auth
├── android/app/
│   └── google-services.json    # Firebase Android config
└── app.json                    # Expo configuration
```

The project is now ready for testing once you complete the Firebase Console setup! 🎉