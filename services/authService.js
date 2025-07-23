// Cross-platform authentication service
// Handles both web and native Firebase authentication

import { Platform } from 'react-native';

// Firebase web configuration
const webConfig = {
  apiKey: 'AIzaSyD2uVhZHFHManM-TLc0McOODr8v0Wt7o4U',
  authDomain: 'supper-8cb60.firebaseapp.com',
  projectId: 'supper-8cb60',
  storageBucket: 'supper-8cb60.firebasestorage.app',
  messagingSenderId: '936008982768',
  appId: '1:936008982768:web:332d1fccff91c0f5e9e235'
};

class AuthService {
  constructor() {
    this.auth = null;
    this.GoogleAuthProvider = null;
    this.initialized = false;
    this.init();
  }

  async init() {
    try {
      if (Platform.OS === 'web') {
        // Web Firebase initialization
        const { initializeApp } = await import('firebase/app');
        const { getAuth, GoogleAuthProvider, signInWithPopup, signOut: firebaseSignOut } = await import('firebase/auth');
        
        const app = initializeApp(webConfig);
        this.auth = getAuth(app);
        this.GoogleAuthProvider = GoogleAuthProvider;
        this.signInWithPopup = signInWithPopup;
        this.firebaseSignOut = firebaseSignOut;
        
        console.log('[AuthService] Web Firebase initialized');
      } else {
        // Native Firebase initialization
        const { default: auth } = await import('@react-native-firebase/auth');
        const { GoogleSignin } = await import('@react-native-google-signin/google-signin');
        
        // Configure Google Sign-In for native
        GoogleSignin.configure({
          webClientId: '936008982768-htlfcbthj1crbpbvh13pn75f2jegc9ia.apps.googleusercontent.com',
          offlineAccess: true,
          hostedDomain: '',
          forceCodeForRefreshToken: true,
        });
        
        this.auth = auth;
        this.GoogleSignin = GoogleSignin;
        
        console.log('[AuthService] Native Firebase initialized');
      }
      
      this.initialized = true;
    } catch (error) {
      console.error('[AuthService] Initialization failed:', error);
    }
  }

  async signInWithGoogle() {
    if (!this.initialized) {
      throw new Error('AuthService not initialized');
    }

    try {
      if (Platform.OS === 'web') {
        // Web Google Sign-In
        const provider = new this.GoogleAuthProvider();
        const result = await this.signInWithPopup(this.auth, provider);
        return {
          user: {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          },
          success: true
        };
      } else {
        // Native Google Sign-In
        await this.GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await this.GoogleSignin.signIn();
        const googleCredential = this.auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await this.auth().signInWithCredential(googleCredential);
        
        return {
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
          },
          success: true
        };
      }
    } catch (error) {
      console.error('[AuthService] Google sign-in failed:', error);
      throw error;
    }
  }

  async signOut() {
    if (!this.initialized) {
      throw new Error('AuthService not initialized');
    }

    try {
      if (Platform.OS === 'web') {
        // Web sign out
        await this.firebaseSignOut(this.auth);
      } else {
        // Native sign out
        await this.GoogleSignin.signOut();
        await this.auth().signOut();
      }
      
      console.log('[AuthService] Sign out successful');
    } catch (error) {
      console.error('[AuthService] Sign out failed:', error);
      throw error;
    }
  }

  getCurrentUser() {
    if (!this.initialized || !this.auth) {
      return null;
    }

    if (Platform.OS === 'web') {
      return this.auth.currentUser;
    } else {
      return this.auth().currentUser;
    }
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;