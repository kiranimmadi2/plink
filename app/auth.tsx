/**
 * @file auth.tsx
 * @description Complete authentication page with real functionality
 * @features - Login/Signup tabs, email/password auth, Google Sign-In, form validation
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

type AuthMode = 'login' | 'signup';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
}

export default function AuthScreen() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme } = useTheme();
  const { login, signup, googleSignIn, isLoading, error, clearError, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  // Clear auth errors when switching modes
  useEffect(() => {
    clearError();
  }, [authMode]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Signup specific validations
    if (authMode === 'signup') {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailAuth = async () => {
    if (!validateForm()) return;

    try {
      let result;
      if (authMode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await signup(formData.email, formData.password, formData.fullName);
      }

      if (result.success) {
        Alert.alert('Success!', result.message, [
          { text: 'Continue', onPress: () => router.replace('/(tabs)') }
        ]);
      } else {
        Alert.alert('Authentication Error', result.message);
      }
    } catch (error: any) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await googleSignIn();
      
      if (result.success) {
        Alert.alert('Success!', result.message, [
          { text: 'Continue', onPress: () => router.replace('/(tabs)') }
        ]);
      } else {
        Alert.alert('Authentication Error', result.message);
      }
    } catch (error: any) {
      Alert.alert('Error', 'Google Sign-In failed. Please try again.');
    }
  };

  const switchAuthMode = (mode: AuthMode) => {
    setAuthMode(mode);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    });
    clearError();
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={theme.blur ? 
          ['rgba(120, 120, 120, 0.3)', 'rgba(180, 180, 180, 0.25)', 'rgba(200, 200, 200, 0.35)'] :
          ['#f0f9ff', '#e0f2fe', '#f8fafc']
        }
        style={StyleSheet.absoluteFillObject}
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.blur ? '#ffffff' : '#1f2937' }]}>
              Welcome to PLINK
            </Text>
            <Text style={[styles.subtitle, { color: theme.blur ? '#e5e7eb' : '#6b7280' }]}>
              {authMode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </Text>
          </View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>{error}</Text>
            </View>
          )}

          {/* Auth Mode Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                authMode === 'login' && styles.activeTab,
                { backgroundColor: authMode === 'login' ? '#3b82f6' : 'transparent' }
              ]}
              onPress={() => switchAuthMode('login')}
            >
              <Text style={[
                styles.tabText,
                { color: authMode === 'login' ? '#ffffff' : (theme.blur ? '#9ca3af' : '#6b7280') }
              ]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                authMode === 'signup' && styles.activeTab,
                { backgroundColor: authMode === 'signup' ? '#3b82f6' : 'transparent' }
              ]}
              onPress={() => switchAuthMode('signup')}
            >
              <Text style={[
                styles.tabText,
                { color: authMode === 'signup' ? '#ffffff' : (theme.blur ? '#9ca3af' : '#6b7280') }
              ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name (Signup only) */}
            {authMode === 'signup' && (
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.blur ? '#e5e7eb' : '#374151' }]}>
                  Full Name
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      backgroundColor: theme.blur ? 'rgba(255,255,255,0.1)' : '#ffffff',
                      borderColor: errors.fullName ? '#ef4444' : (theme.blur ? 'rgba(255,255,255,0.2)' : '#e5e7eb'),
                      color: theme.blur ? '#ffffff' : '#1f2937'
                    }
                  ]}
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.blur ? '#9ca3af' : '#9ca3af'}
                  value={formData.fullName}
                  onChangeText={(text) => updateFormData('fullName', text)}
                  autoCapitalize="words"
                  editable={!isLoading}
                />
                {errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
              </View>
            )}

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.blur ? '#e5e7eb' : '#374151' }]}>
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: theme.blur ? 'rgba(255,255,255,0.1)' : '#ffffff',
                    borderColor: errors.email ? '#ef4444' : (theme.blur ? 'rgba(255,255,255,0.2)' : '#e5e7eb'),
                    color: theme.blur ? '#ffffff' : '#1f2937'
                  }
                ]}
                placeholder="Enter your email"
                placeholderTextColor={theme.blur ? '#9ca3af' : '#9ca3af'}
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                importantForAutofill="yes"
                editable={!isLoading}
                {...(Platform.OS === 'web' && {
                  // Web-specific props for better email autocomplete
                  autoFocus: false,
                  autoCompleteType: 'email',
                  name: 'email',
                  type: 'email'
                })}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.blur ? '#e5e7eb' : '#374151' }]}>
                Password
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    { 
                      backgroundColor: theme.blur ? 'rgba(255,255,255,0.1)' : '#ffffff',
                      borderColor: errors.password ? '#ef4444' : (theme.blur ? 'rgba(255,255,255,0.2)' : '#e5e7eb'),
                      color: theme.blur ? '#ffffff' : '#1f2937'
                    }
                  ]}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.blur ? '#9ca3af' : '#9ca3af'}
                  value={formData.password}
                  onChangeText={(text) => updateFormData('password', text)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                  textContentType={authMode === 'login' ? 'password' : 'newPassword'}
                  importantForAutofill="yes"
                  editable={!isLoading}
                  {...(Platform.OS === 'web' && {
                    name: 'password',
                    type: 'password'
                  })}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={theme.blur ? '#9ca3af' : '#6b7280'}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password (Signup only) */}
            {authMode === 'signup' && (
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.blur ? '#e5e7eb' : '#374151' }]}>
                  Confirm Password
                </Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      { 
                        backgroundColor: theme.blur ? 'rgba(255,255,255,0.1)' : '#ffffff',
                        borderColor: errors.confirmPassword ? '#ef4444' : (theme.blur ? 'rgba(255,255,255,0.2)' : '#e5e7eb'),
                        color: theme.blur ? '#ffffff' : '#1f2937'
                      }
                    ]}
                    placeholder="Confirm your password"
                    placeholderTextColor={theme.blur ? '#9ca3af' : '#9ca3af'}
                    value={formData.confirmPassword}
                    onChangeText={(text) => updateFormData('confirmPassword', text)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color={theme.blur ? '#9ca3af' : '#6b7280'}
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.disabledButton]}
              onPress={handleEmailAuth}
              disabled={isLoading}
            >
              <LinearGradient
                colors={isLoading ? ['#9ca3af', '#6b7280'] : ['#3b82f6', '#1d4ed8']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text style={styles.buttonText}>
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: theme.blur ? 'rgba(255,255,255,0.2)' : '#e5e7eb' }]} />
              <Text style={[styles.dividerText, { color: theme.blur ? '#9ca3af' : '#6b7280' }]}>or</Text>
              <View style={[styles.dividerLine, { backgroundColor: theme.blur ? 'rgba(255,255,255,0.2)' : '#e5e7eb' }]} />
            </View>

            {/* Google Sign-In Button */}
            <TouchableOpacity
              style={[styles.googleButton, isLoading && styles.disabledButton]}
              onPress={handleGoogleAuth}
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

            {/* Skip Button */}
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => router.replace('/(tabs)')}
              disabled={isLoading}
            >
              <Text style={[styles.skipText, { color: theme.blur ? '#9ca3af' : '#6b7280' }]}>
                Skip for now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  content: {
    width: width * 0.9,
    alignSelf: 'center',
    maxWidth: 400,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  errorMessage: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 25,
    padding: 4,
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 21,
    alignItems: 'center',
  },
  activeTab: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 14,
    padding: 4,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginLeft: 4,
  },
  submitButton: {
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 10,
  },
  googleButton: {
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  skipButton: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
  },
});