import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';
import { loginUser } from '../services/api';

// Login component
export default function Login() {
  // useNavigation hook to access navigation object
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // function to handle login
  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
      console.log('Login response:', data);
      Alert.alert('Success', 'Logged in successfully!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' as never }],
      });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  // Login component
  return (
    // KeyboardAvoidingView to handle keyboard behavior
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* TouchableWithoutFeedback to dismiss keyboard */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Login form */}
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#A390E4"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A390E4"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
            
          {/* Sign Up link */}
          <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'signup' as never }] })}>
            <Text style={styles.linkText}>Don’t have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}