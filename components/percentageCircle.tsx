import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles';

interface PercentageCircleProps {
  label: string;
  percentage: number;
}

export default function PercentageCircle({ label, percentage }: PercentageCircleProps) {
  return (
    <View style={localStyles.container}>
      <Text style={localStyles.label}>{label}</Text>
      <View style={localStyles.circle}>
        <Text style={localStyles.percentage}>{percentage}%</Text>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: styles.title.color,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: styles.button.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 20,
    color: styles.title.color,
  },
});