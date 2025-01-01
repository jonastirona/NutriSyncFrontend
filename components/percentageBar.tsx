import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles/styles';

// Props for PercentageBar component
interface PercentageBarProps {
    label: string;
    percentage: number;
    value?: number;
}

// Component to display a percentage bar
export default function PercentageBar({ label, percentage, value }: PercentageBarProps) {
    return (
        <View style={localStyles.container}>
            <Text style={localStyles.label}>{label}</Text>
            <View style={localStyles.barContainer}>
                <View style={[localStyles.bar, { width: `${percentage}%` }]} />
            </View>
            <View style={localStyles.bottomContainer}>
                <Text style={localStyles.percentage}>{percentage}%</Text>
                {value !== undefined && (
                    <Text style={localStyles.valueText}>{value.toFixed(1)}</Text>
                )}
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        margin: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: styles.title.color,
    },
    barContainer: {
        height: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: styles.button.backgroundColor,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        position: 'relative',
    },
    percentage: {
        fontSize: 16,
        color: styles.title.color,
    },
    valueText: {
        fontSize: 16,
        color: styles.title.color,
        position: 'absolute',
        right: 0,
    }
});