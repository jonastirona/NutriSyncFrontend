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

export default function Signup() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Create an account to get started!</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#A390E4"
          />
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
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#A390E4"
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkText}>Already have an account? Log In</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}