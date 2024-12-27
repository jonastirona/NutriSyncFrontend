import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles';

interface PercentageCircleProps {
    label: string;
    percentage: number;
    value?: number;
    circleStyle?: any;
    textStyle?: any;
}

export default function PercentageCircle({ label, percentage, value, circleStyle, textStyle }: PercentageCircleProps) {
    return (
        <View style={localStyles.container}>
            <Text style={localStyles.label}>{label}</Text>
            <View style={[localStyles.circle, circleStyle]}>
                <Text style={[localStyles.percentage, textStyle]}>{percentage}%</Text>
            </View>
            {value !== undefined && (
                <Text style={localStyles.valueText}>{value.toFixed(1)}</Text>
            )}
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
        fontSize: 16,
        color: styles.title.color,
    },
      valueText:{
        fontSize: 14,
        marginTop: 5,
        color: styles.title.color,
    }
});