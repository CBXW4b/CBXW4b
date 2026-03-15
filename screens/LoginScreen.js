// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginCode, setLoginCode] = useState('');

  const handleSubmit = () => {
    if (username === 'Lazor-DEV' && password === '252532' && loginCode === 'Cv27e') {
      onLogin(true);
    } else {
      Alert.alert('ACCESS DENIED', 'Unauthorized Access - Identity Rejected', [
        { text: 'RETRY', style: 'cancel' },
      ]);
    }
  };

  const CyberIcon = () => (
    <Svg width="60" height="60" viewBox="0 0 24 24" fill="none">
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#00ff99" />
          <Stop offset="100%" stopColor="#aa00ff" />
        </LinearGradient>
      </Defs>
      <Path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#grad)" strokeWidth="1.5" fill="none" />
      <Path d="M2 17L12 22L22 17" stroke="url(#grad)" strokeWidth="1.5" fill="none" />
      <Path d="M2 12L12 17L22 12" stroke="url(#grad)" strokeWidth="1.5" fill="none" />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CyberIcon />
        <Text style={styles.title}>ZORRR BLACK</Text>
        <Text style={styles.subtitle}>GATEKEEPER v1.0</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>ADMIN USER</Text>
        <TextInput
          style={styles.input}
          placeholder="Lazor-DEV"
          placeholderTextColor="#333"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••"
          placeholderTextColor="#333"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>LOGIN CODE (OTP)</Text>
        <TextInput
          style={styles.input}
          placeholder="Cv27e"
          placeholderTextColor="#333"
          value={loginCode}
          onChangeText={setLoginCode}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>⟫ AUTHENTICATE ⟪</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>UNAUTHORIZED ACCESS WILL BE TRACKED</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ff99',
    marginTop: 10,
    textShadowColor: '#00ff99',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: '#aa00ff',
    fontSize: 12,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    color: '#00ff99',
    marginBottom: 5,
    fontSize: 11,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1a1a1a',
    padding: 18,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00ff99',
  },
  buttonText: {
    color: '#00ff99',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  footerText: {
    color: '#333',
    fontSize: 10,
  },
});

export default LoginScreen;
