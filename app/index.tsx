import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/styles';

// MainScreen component
export default function MainScreen() {
  const router = useRouter();

  // log a message when the component is loaded
  useEffect(() => {
    console.log('MainScreen component loaded');
  }, []);

  return (
    <View style={styles.container}>
      {/* MainScreen content */}
      <Text style={styles.title}>NUTRISYNC</Text>
      <Text style={styles.subtitle}>want to sync your diet with your nutritional goals? let us help!</Text>

      {/* Login and Sign Up buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}