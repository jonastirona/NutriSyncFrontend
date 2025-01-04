import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import percentageBarStyles from '../styles/percentageBarStyles';
import { UserContext } from '../context/userContext';
import { getUserGoal } from '../services/api';

// Props for PercentageBar component
interface PercentageBarProps {
    label: string;
    value: number;
}

// Component to display a percentage bar
export default function PercentageBar({ label, value }: PercentageBarProps) {
    const { username } = useContext(UserContext) || {};
    const [calorieGoal, setCalorieGoal] = useState<number | null>(null);

    useEffect(() => {
        const fetchCalorieGoal = async () => {
            try {
                const goal = await getUserGoal(username);
                setCalorieGoal(goal.calorieGoal);
            } catch (error) {
                console.error('Failed to fetch user goal:', error);
            }
        };

        if (username) {
            fetchCalorieGoal();
        }
    }, [username]);

    if (calorieGoal === null) {
        return <Text>Loading...</Text>;
    }

    const percentage = (value / calorieGoal) * 100;

    return (
        <View style={percentageBarStyles.container}>
            <Text style={percentageBarStyles.label}>{label}</Text>
            <View style={percentageBarStyles.barContainer}>
                <View style={[percentageBarStyles.bar, { width: `${percentage}%` }]} />
            </View>
            <View style={percentageBarStyles.bottomContainer}>
                <Text style={percentageBarStyles.percentage}>{percentage.toFixed(1)}%</Text>
                <Text style={percentageBarStyles.valueText}>{value.toFixed(1)}</Text>
            </View>
        </View>
    );
}