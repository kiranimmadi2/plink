// Main App Navigator - Handles navigation between Auth and App screens
// This navigator switches between Login and Home based on authentication state

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

// Auth Stack - Screens shown when user is not authenticated
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          title: 'Sign In',
        }}
      />
    </Stack.Navigator>
  );
};

// App Stack - Screens shown when user is authenticated
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      {/* Add more authenticated screens here in the future */}
    </Stack.Navigator>
  );
};

// Main App Navigator - Switches between Auth and App stacks
const AppNavigator = ({ isAuthenticated }) => {
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;