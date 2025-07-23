// Firebase configuration for React Native app
// This file initializes Firebase services and Google Sign-In for both web and native platforms

import { Platform } from 'react-native';

// Firebase configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyD2uVhZHFHManM-TLc0McOODr8v0Wt7o4U',
  authDomain: 'supper-8cb60.firebaseapp.com',
  projectId: 'supper-8cb60',
  storageBucket: 'supper-8cb60.firebasestorage.app',
  messagingSenderId: '936008982768',
  appId: Platform.OS === 'web' 
    ? '1:936008982768:web:332d1fccff91c0f5e9e235' 
    : '1:936008982768:android:5e145b4a76675a40e9e235',
};

// Platform-specific initialization
let auth = null;
let GoogleSignin = null;

if (Platform.OS === 'web') {
  // Web platform - use Firebase web SDK
  try {
    const { initializeApp } = require('firebase/app');
    const { getAuth, GoogleAuthProvider, signInWithPopup } = require('firebase/auth');
    
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    
    // Web Google Sign-In implementation
    GoogleSignin = {
      signIn: async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return {
          idToken: await result.user.getIdToken(),
          user: result.user
        };
      },
      signOut: async () => {
        await auth.signOut();
      },
      configure: () => {}, // No-op for web
      hasPlayServices: () => Promise.resolve(true), // Always true for web
    };
  } catch (error) {
    console.error('Failed to initialize Firebase web SDK:', error);
  }
} else {
  // Native platform - use React Native Firebase
  try {
    const { GoogleSignin: NativeGoogleSignin } = require('@react-native-google-signin/google-signin');
    
    NativeGoogleSignin.configure({
      webClientId: '936008982768-htlfcbthj1crbpbvh13pn75f2jegc9ia.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
    });
    
    GoogleSignin = NativeGoogleSignin;
    auth = require('@react-native-firebase/auth').default;
  } catch (error) {
    console.error('Failed to initialize Firebase native SDK:', error);
  }
}

export { firebaseConfig, auth };
export default GoogleSignin;