// Authentication Context - Manages user authentication state across the app
// Provides auth state, user data, and authentication methods to all components

import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import GoogleSignin from './firebaseConfig';

// Create the authentication context
const AuthContext = createContext({});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle user authentication state changes
  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Subscribe to authentication state changes
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    
    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Function called whenever auth state changes
  const onAuthStateChanged = (user) => {
    console.log('Auth state changed:', user ? user.email : 'No user');
    
    setUser(user);
    setIsAuthenticated(!!user);
    
    // Set loading to false after first auth check
    if (isLoading) {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      console.log('Signing out user...');
      
      // Sign out from Google
      await GoogleSignin.signOut();
      
      // Sign out from Firebase
      await auth().signOut();
      
      console.log('User signed out successfully');
      return { success: true };
      
    } catch (error) {
      console.error('Sign out error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to sign out'
      };
    }
  };

  // Get current user info
  const getCurrentUser = () => {
    return auth().currentUser;
  };

  // Check if user is authenticated
  const checkAuthStatus = () => {
    const currentUser = auth().currentUser;
    setIsAuthenticated(!!currentUser);
    setUser(currentUser);
    return !!currentUser;
  };

  // Context value object
  const value = {
    user,
    isAuthenticated,
    isLoading,
    signOut,
    getCurrentUser,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};