// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, ActivityIndicator } from 'react-native';

// Import screens (akan dibuat)
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import MainScreen from './screens/MainScreen';
import MusicoScreen from './screens/MusicoScreen';
import SettingScreen from './screens/SettingScreen';
import CustomDrawerContent from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        if (session === 'Lazor-DEV') {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async (status) => {
    if (status) {
      await AsyncStorage.setItem('userSession', 'Lazor-DEV');
      setIsLoggedIn(true);
    } else {
      await AsyncStorage.removeItem('userSession');
      setIsLoggedIn(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00ff99" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#0a0a0a" />
        <NavigationContainer>
          {!isLoggedIn ? (
            <LoginScreen onLogin={handleLogin} />
          ) : (
            <Drawer.Navigator
              drawerContent={(props) => <CustomDrawerContent {...props} onLogout={() => handleLogin(false)} />}
              screenOptions={{
                headerStyle: { backgroundColor: '#0f0f0f' },
                headerTintColor: '#00ff99',
                drawerStyle: { backgroundColor: '#0f0f0f', width: 240 },
                drawerLabelStyle: { color: '#e0e0e0' },
                drawerActiveTintColor: '#00ff99',
                drawerInactiveTintColor: '#888',
              }}
            >
              <Drawer.Screen name="Dashboard" component={DashboardScreen} />
              <Drawer.Screen name="Utama" component={MainScreen} />
              <Drawer.Screen name="Musico" component={MusicoScreen} />
              <Drawer.Screen name="Setting" component={SettingScreen} />
            </Drawer.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
            }
