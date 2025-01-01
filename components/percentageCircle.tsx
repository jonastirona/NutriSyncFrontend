import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';
import percentageCircleStyles from '../styles/percentageCircleStyles';

// Props for PercentageCircle component
interface PercentageCircleProps {
    label: string;
    percentage: number;
    value?: number;
    circleStyle?: any;
    textStyle?: any;
}

// Component to display a percentage circle
export default function PercentageCircle({ label, percentage, value, circleStyle, textStyle }: PercentageCircleProps) {
    return (
        <View style={percentageCircleStyles.container}>
            <Text style={percentageCircleStyles.label}>{label}</Text>
            <View style={[percentageCircleStyles.circle, circleStyle]}>
                <Text style={[percentageCircleStyles.percentage, textStyle]}>{percentage}%</Text>
            </View>
            {value !== undefined && (
                <Text style={percentageCircleStyles.valueText}>{value.toFixed(1)}</Text>
            )}
        </View>
    );
}