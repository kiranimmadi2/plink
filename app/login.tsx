/**
 * @file login.tsx
 * @description Google login page with real functionality
 * @features - Google Sign-In integration, proper authentication flow
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const { theme } = useTheme();
  const { googleSignIn, isLoading, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      
      if (result.success) {
        Alert.alert('Success!', result.message, [
          {
            text: 'Continue',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
        );
      } else {
        Alert.alert('Authentication Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Google Sign-In failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.blur ? 
          ['rgba(120, 120, 120, 0.3)', 'rgba(180, 180, 180, 0.25)', 'rgba(200, 200, 200, 0.35)'] :
          ['#f0f9ff', '#e0f2fe', '#f8fafc']
        }
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.blur ? '#ffffff' : '#1f2937' }]}>
            Welcome to PLINK
          </Text>
          <Text style={[styles.subtitle, { color: theme.blur ? '#e5e7eb' : '#6b7280' }]}>
            Connect and share with friends
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.googleButton, isLoading && styles.disabledButton]}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            <LinearGradient
              colors={isLoading ? ['#9ca3af', '#6b7280'] : ['#4285F4', '#34A853']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  <Text style={styles.googleIcon}>G</Text>
                  <Text style={styles.buttonText}>Continue with Google</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.replace('/(tabs)')}
            disabled={isLoading}
          >
            <Text style={[styles.skipText, { color: theme.blur ? '#9ca3af' : '#6b7280' }]}>
              Skip for now
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.push('/auth')}
            disabled={isLoading}
          >
            <Text style={[styles.authText, { color: theme.blur ? '#ffffff' : '#3b82f6' }]}>
              Sign up with Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.blur ? '#9ca3af' : '#9ca3af' }]}>
          By continuing, you agree to our Terms of Service
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: width * 0.85,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  googleButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 16,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
    backgroundColor: '#ffffff',
    color: '#4285F4',
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  authButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  authText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 40,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});