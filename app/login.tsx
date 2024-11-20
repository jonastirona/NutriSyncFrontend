import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles';

export default function Login() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A390E4"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A390E4"
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.linkText}>Don’t have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}