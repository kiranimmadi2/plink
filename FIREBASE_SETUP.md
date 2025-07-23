# Firebase Authentication Setup Guide

## Overview
This guide explains how to set up Firebase Authentication with Google Sign-In in your React Native Expo project.

## What Has Been Implemented

### 1. Packages Installed
```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
```

### 2. Project Structure
```
├── services/
│   ├── firebaseConfig.js       # Firebase configuration
│   └── AuthContext.js          # Authentication context (optional)
├── screens/
│   ├── LoginScreen.js          # Standalone login screen
│   └── HomeScreen.js           # Standalone home screen  
├── navigation/
│   └── AppNavigator.js         # Standalone navigation
└── android/app/
    └── google-services.json    # Firebase configuration for Android
```

### 3. Configuration Files

#### app.json (Updated)
- Added Firebase and Google Sign-In plugins
- Configured Android package name and Google Services file path
- Added iOS configuration (for future use)

#### google-services.json
- Placed in `android/app/` directory
- Contains Firebase project configuration
- Includes OAuth client credentials

### 4. Integration with Existing App

The Firebase authentication has been integrated into your existing sophisticated app:

#### Enhanced LoginScreen (`src/screens/LoginScreen.tsx`)
- Added Google Sign-In functionality to the existing Google button
- Maintains all existing glassmorphism styling and animations
- Uses Firebase authentication with proper error handling

#### Enhanced HomeScreen (`src/screens/HomeScreen.tsx`)
- Added sign-out functionality to the settings button (⚙️)
- Maintains existing chat interface and styling
- Proper navigation back to auth flow on sign-out

#### Enhanced App.tsx
- Added Google Sign-In configuration on app startup
- Maintains existing navigation structure

## How to Run

### For Android (Current Setup)
1. **Build with Expo:**
   ```bash
   npx expo run:android
   ```
   OR
   ```bash
   npm start
   # Then press 'a' for Android
   ```

2. **Using Expo Go:**
   - Install Expo Go from Play Store
   - Scan QR code from terminal
   - **Note:** Google Sign-In may not work fully in Expo Go due to custom URL schemes

### For iOS (Future Setup)
1. **Add iOS Google Services file:**
   - Download `GoogleService-Info.plist` from Firebase Console
   - Place in `ios/` directory (will be created during iOS build)

2. **Update app.json iOS configuration:**
   ```json
   "ios": {
     "supportsTablet": false,
     "googleServicesFile": "./ios/GoogleService-Info.plist",
     "bundleIdentifier": "com.supperios"
   }
   ```

3. **Build for iOS:**
   ```bash
   npx expo run:ios
   ```

## Testing the Authentication Flow

### Google Sign-In Flow:
1. Open the app
2. Navigate to Login screen
3. Tap "Google" button in the social login section
4. Complete Google authentication
5. Automatically navigate to Home screen
6. Tap settings button (⚙️) to sign out

### Test Credentials (Existing):
The app also supports the existing mock login:
- Email: `test@example.com`
- Password: `Test123!`

## Firebase Configuration Details

### Project Configuration:
- **Project ID:** supper-8cb60
- **Package Name:** com.supperios
- **Web Client ID:** 936008982768-htlfcbthj1crbpbvh13pn75f2jegc9ia.apps.googleusercontent.com

### Authentication Providers Enabled:
- ✅ Google Sign-In
- ✅ Email/Password (existing mock)

## Troubleshooting

### Common Issues:

1. **Google Sign-In not working in Expo Go:**
   - Solution: Use `npx expo run:android` for full native build

2. **"Developer Error" during Google Sign-In:**
   - Check that SHA-1 fingerprints are added to Firebase Console
   - Verify package name matches in Firebase and app.json

3. **Navigation issues:**
   - The app uses the existing sophisticated navigation system
   - Authentication state changes are handled automatically

4. **Build errors:**
   - Ensure all packages are installed: `npm install`
   - Clear cache: `npx expo start --clear`

### Getting SHA-1 Fingerprint:
For Android debug builds:
```bash
cd android && ./gradlew signingReport
```

## Next Steps

1. **Test the implementation:**
   - Run the app with `npx expo run:android`
   - Test Google Sign-In functionality
   - Verify sign-out works properly

2. **Deploy to production:**
   - Add production SHA-1 fingerprints to Firebase Console
   - Build production APK/AAB using Expo EAS Build

3. **Add iOS support:**
   - Set up iOS Firebase project
   - Add GoogleService-Info.plist
   - Test on iOS device

## Code Integration

The Firebase authentication is seamlessly integrated with your existing app's architecture:
- Maintains glassmorphism design system
- Uses existing navigation structure
- Preserves all existing animations and styling
- Follows existing code patterns and conventions

Your existing features like the chat interface, onboarding flow, and splash screen remain unchanged and fully functional.