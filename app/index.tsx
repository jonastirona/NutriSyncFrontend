import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles';

export default function MainScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NUTRISYNC</Text>
      <Text style={styles.subtitle}>want to sync your diet with your nutritional goals? let us help!</Text>

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