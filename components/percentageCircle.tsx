import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import percentageCircleStyles from '../styles/percentageCircleStyles';
import { UserContext } from '../context/userContext';
import { getUserGoal } from '../services/api';

interface PercentageCircleProps {
    label: 'Protein' | 'Carbs' | 'Fat';
    value: number;
}

const PercentageCircle = ({ label, value }: PercentageCircleProps) => {
    const { username } = useContext(UserContext) || {};
    const [userGoal, setUserGoal] = useState<number>(0); // default to 0 if no value

    useEffect(() => {
        const fetchUserGoal = async () => {
            try {
                const data = await getUserGoal(username);
                if (data.length > 0) {
                    setUserGoal(data[0].user_calorie_goal);
                }
            } catch (error) {
                console.error('Error fetching user goal:', error);
            }
        };

        fetchUserGoal();
    }, [username]);

    let percentage = 0;
    let goalInGrams = 0;

    switch (label) {
        case 'Fat':
            percentage = 15;
            goalInGrams = (userGoal * 0.15) / 9;
            break;
        case 'Protein':
            percentage = 30;
            goalInGrams = (userGoal * 0.30) / 4;
            break;
        case 'Carbs':
            percentage = 55;
            goalInGrams = (userGoal * 0.55) / 4;
            break;
    }

    const radius = 30; // Smaller radius
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <View style={percentageCircleStyles.container}>
            <Text style={percentageCircleStyles.label}>{label}</Text>
            <View style={percentageCircleStyles.svgContainer}>
                <Svg height="70" width="70" viewBox="0 0 70 70">
                    <Circle
                        cx="35"
                        cy="35"
                        r={radius}
                        stroke="#2D2D44"
                        strokeWidth="5"
                        fill="none"
                    />
                    <Circle
                        cx="35"
                        cy="35"
                        r={radius}
                        stroke="#76c7c0"
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </Svg>
                <Text style={percentageCircleStyles.percentageText}>{percentage}%</Text>
            </View>
            <Text style={percentageCircleStyles.valueText}>{value}/{goalInGrams.toFixed(1)}g</Text>
        </View>
    );
};

export default PercentageCircle;