import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';
import { signupUser } from '../services/api';
import { useUser } from '../context/userContext';

// signup component
export default function Signup() {
  // state variables
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUsername: setGlobalUsername } = useUser();

  // function to handle signup
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await signupUser({ username, email, password });
      Alert.alert('Success', 'User registered successfully');
      setGlobalUsername(username); // set the global username
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' as never }],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to register user');
    }
  };

  // render the Signup component
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Signup form */}
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            maxLength={20}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'login' as never }] })}>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}