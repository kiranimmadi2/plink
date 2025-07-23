// Home Screen - Displays after successful authentication
// This screen shows user information and provides sign-out functionality

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const user = auth().currentUser;

  // Handle sign out process
  const handleSignOut = async () => {
    try {
      setLoading(true);
      
      // Sign out from Google
      await GoogleSignin.signOut();
      
      // Sign out from Firebase
      await auth().signOut();
      
      console.log('User signed out successfully');
      // Navigation will be handled automatically by auth state listener in App.js
      
    } catch (error) {
      setLoading(false);
      console.error('Sign-Out Error:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  // Confirm sign out with user
  const confirmSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: handleSignOut,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitle}>You're successfully signed in</Text>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          {user?.photoURL && (
            <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
          )}
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.displayName || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <Text style={styles.userUid}>UID: {user?.uid.substring(0, 8)}...</Text>
          </View>
        </View>

        {/* App Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>App Features</Text>
          
          <TouchableOpacity style={styles.featureCard}>
            <Text style={styles.featureTitle}>Profile Management</Text>
            <Text style={styles.featureDescription}>Update your profile information</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <Text style={styles.featureTitle}>Settings</Text>
            <Text style={styles.featureDescription}>Customize your app experience</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <Text style={styles.featureTitle}>Data & Privacy</Text>
            <Text style={styles.featureDescription}>Manage your data and privacy settings</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={[styles.signOutButton, loading && styles.buttonDisabled]}
          onPress={confirmSignOut}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FF4444" size="small" />
          ) : (
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Powered by Firebase Authentication
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#BBBBBB',
    textAlign: 'center',
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#4285F4',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#BBBBBB',
    marginBottom: 5,
  },
  userUid: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'monospace',
  },
  featuresSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#BBBBBB',
  },
  signOutButton: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signOutButtonText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default HomeScreen;