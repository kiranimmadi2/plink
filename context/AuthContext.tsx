/**
 * @file AuthContext.tsx
 * @description Firebase Authentication with Expo-compatible approach
 * @features - Web Firebase SDK, Google Sign-In, user management
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  initializeApp, 
  getApps, 
  FirebaseApp 
} from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithCredential,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin'; // Temporarily disabled

// Firebase config from your google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyD2uVhZHFHManM-TLc0McOODr8v0Wt7o4U",
  authDomain: "supper-8cb60.firebaseapp.com",
  projectId: "supper-8cb60",
  storageBucket: "supper-8cb60.firebasestorage.app",
  messagingSenderId: "936008982768",
  appId: "1:936008982768:android:332d1fccff91c0f5e9e235"
};

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (email: string, password: string, fullName: string) => Promise<{ success: boolean; message: string }>;
  googleSignIn: () => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  clearError: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    // Initialize Firebase
    let app: FirebaseApp;
    if (getApps().length === 0) {
      console.log('🔥 Initializing Firebase app...');
      app = initializeApp(firebaseConfig);
      console.log('✅ Firebase app initialized');
    } else {
      app = getApps()[0];
      console.log('♻️ Using existing Firebase app');
    }
    
    const authInstance = getAuth(app);
    setAuth(authInstance);
    console.log('🔐 Firebase Auth initialized:', {
      authDomain: authInstance.config.authDomain,
      projectId: authInstance.config.apiKey ? 'API key present' : 'API key missing'
    });

    // Configure Google Sign-In - temporarily disabled
    /* GoogleSignin.configure({
      webClientId: '936008982768-htlfcbthj1crbpbvh13pn75f2jegc9ia.apps.googleusercontent.com',
      androidClientId: '936008982768-9l0trvej3d6kvehgf30ajhhnilhj2nue.apps.googleusercontent.com',
    }); */

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(authInstance, (firebaseUser: FirebaseUser | null) => {
      console.log('🔄 Auth state changed:', firebaseUser ? `User: ${firebaseUser.email}` : 'User logged out');
      
      if (firebaseUser) {
        const userData: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        };
        console.log('👤 Setting user data:', userData);
        setUser(userData);
      } else {
        console.log('👤 Clearing user data');
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, fullName: string) => {
    if (!auth) {
      return { success: false, message: 'Authentication not initialized' };
    }

    console.log('🚀 Starting signup process for:', email);
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Check network connectivity
      console.log('🌐 Firebase config check:', {
        authDomain: auth.config.authDomain,
        hasApiKey: !!auth.config.apiKey
      });

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ User created successfully:', userCredential.user.uid);
      
      // Update the user profile with display name
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });
      console.log('✅ Profile updated with display name:', fullName);

      // Send email verification
      await sendEmailVerification(userCredential.user);
      console.log('✅ Email verification sent to:', userCredential.user.email);

      return { 
        success: true, 
        message: `Account created successfully! Welcome ${fullName}! Please check your email to verify your account.` 
      };
    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = 'Failed to create account. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Try logging in instead.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = error.message || 'An error occurred during sign up.';
          console.log('Full error details:', JSON.stringify(error, null, 2));
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (!auth) {
      return { success: false, message: 'Authentication not initialized' };
    }

    try {
      setIsLoading(true);
      setError(null);

      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ User signed in successfully:', userCredential.user.uid);
      
      const displayName = userCredential.user.displayName || 'User';
      return { 
        success: true, 
        message: `Welcome back, ${displayName}!` 
      };
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Failed to sign in. Please try again.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email. Try signing up instead.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Please contact support.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.';
          break;
        default:
          errorMessage = error.message || 'An error occurred during sign in.';
          console.log('Full login error details:', JSON.stringify(error, null, 2));
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignIn = async () => {
    if (!auth) {
      return { success: false, message: 'Authentication not initialized' };
    }

    try {
      setIsLoading(true);
      setError(null);

      // For now, we'll use a web-based approach since native modules aren't working
      // This is a temporary solution until we can properly set up native modules
      return { 
        success: false, 
        message: 'Google Sign-In is temporarily unavailable. Please use email signup/login instead.' 
      };

      /* Native Google Sign-In code - disabled for now due to module conflicts
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the user's ID token
      const signInResult = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const { data } = signInResult;
      if (!data?.idToken) {
        throw new Error('No ID token received from Google Sign-In');
      }

      const googleCredential = GoogleAuthProvider.credential(data.idToken);
      
      // Sign-in the user with the credential
      const userCredential = await signInWithCredential(auth, googleCredential);
      
      const displayName = userCredential.user.displayName || 'User';
      const isNewUser = userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime;
      
      return { 
        success: true, 
        message: isNewUser ? 
          `Welcome to PLINK, ${displayName}! Your account has been created.` :
          `Welcome back, ${displayName}!`
      };
      */
    } catch (error: any) {
      let errorMessage = 'Google Sign-In failed. Please try again.';
      
      // Handle Google Sign-In specific errors
      if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email address using a different sign-in method.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'The Google Sign-In credential is invalid or expired.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Google Sign-In is not enabled. Please contact support.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled. Please contact support.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found. Please try signing up.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Authentication failed. Please try again.';
      } else if (error.code === '12501') {
        // Google Sign-In was cancelled
        errorMessage = 'Google Sign-In was cancelled.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!auth) return;

    try {
      setIsLoading(true);
      console.log('🚪 Starting logout process...');
      
      // Sign out from Google if signed in with Google - temporarily disabled
      /* try {
        await GoogleSignin.signOut();
      } catch (error) {
        // User might not be signed in with Google
        console.log('Google signOut error (might not be signed in):', error);
      } */
      
      // Sign out from Firebase
      await signOut(auth);
      console.log('✅ Successfully logged out from Firebase');
      
      setError(null);
    } catch (error) {
      console.error('❌ Error during logout:', error);
      setError('Error signing out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    googleSignIn,
    logout,
    clearError,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}