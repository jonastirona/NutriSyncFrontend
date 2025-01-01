import React from 'react';
import { View, Text } from 'react-native';
import percentageBarStyles from '../styles/percentageBarStyles';

// Props for PercentageBar component
interface PercentageBarProps {
    label: string;
    percentage: number;
    value?: number;
}

// Component to display a percentage bar
export default function PercentageBar({ label, percentage, value }: PercentageBarProps) {
    return (
        <View style={percentageBarStyles.container}>
            <Text style={percentageBarStyles.label}>{label}</Text>
            <View style={percentageBarStyles.barContainer}>
                <View style={[percentageBarStyles.bar, { width: `${percentage}%` }]} />
            </View>
            <View style={percentageBarStyles.bottomContainer}>
                <Text style={percentageBarStyles.percentage}>{percentage}%</Text>
                {value !== undefined && (
                    <Text style={percentageBarStyles.valueText}>{value.toFixed(1)}</Text>
                )}
            </View>
        </View>
    );
}