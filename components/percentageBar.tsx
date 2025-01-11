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
export default function PercentageBar({ label, value = 0 }: PercentageBarProps) {
    const { username } = useContext(UserContext) || {};
    const [calorieGoal, setCalorieGoal] = useState<number | null>(null);

    useEffect(() => {
        const fetchCalorieGoal = async () => {
            try {
                const goal = await getUserGoal(username);
                // Add null check here since the API returns an array
                if (goal && Array.isArray(goal) && goal.length > 0) {
                    setCalorieGoal(goal[0].user_calorie_goal);
                }
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

    // Ensure both value and calorieGoal are numbers and not zero before calculating percentage
    const percentage = (value && calorieGoal) ? (value / calorieGoal) * 100 : 0;

    return (
        <View style={percentageBarStyles.container}>
            <Text style={percentageBarStyles.label}>{label}</Text>
            <View style={percentageBarStyles.barContainer}>
                <View style={[percentageBarStyles.bar, { width: `${Math.min(percentage, 100)}%` }]} />
            </View>
            <View style={percentageBarStyles.bottomContainer}>
                <Text style={percentageBarStyles.percentage}>
                    {`${percentage.toFixed(1)}%`}
                </Text>
                <Text style={percentageBarStyles.valueText}>
                    {`${value?.toFixed(1) || '0.0'} / ${calorieGoal?.toFixed(1) || '0.0'}`}
                </Text>
            </View>
        </View>
    );
}