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
    const [userGoal, setUserGoal] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const [macroGoal, setMacroGoal] = useState<number>(0);

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

    useEffect(() => {
        // Calculate macro goals based on calorie distribution
        let calculatedMacroGoal = 0;
        switch (label) {
            case 'Fat':
                // 15% of calories from fat, divided by 9 calories per gram
                calculatedMacroGoal = (userGoal * 0.15) / 9;
                break;
            case 'Protein':
                // 30% of calories from protein, divided by 4 calories per gram
                calculatedMacroGoal = (userGoal * 0.30) / 4;
                break;
            case 'Carbs':
                // 55% of calories from carbs, divided by 4 calories per gram
                calculatedMacroGoal = (userGoal * 0.55) / 4;
                break;
        }

        // Calculate actual percentage based on value vs goal
        const newPercentage = calculatedMacroGoal > 0 ? (value / calculatedMacroGoal) * 100 : 0;
        setPercentage(newPercentage);
        setMacroGoal(calculatedMacroGoal);
    }, [userGoal, value, label]);

    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

    return (
        <View style={percentageCircleStyles.container}>
            <Text style={percentageCircleStyles.label}>{label}</Text>
            <View style={percentageCircleStyles.svgContainer}>
                <Svg height="70" width="70" viewBox="0 0 70 70">
                    <Circle
                        cx="35"
                        cy="35"
                        r={radius}
                        stroke='#9e9edb' // periwinkle
                        strokeWidth="5"
                        fill="none"
                    />
                    <Circle
                        cx="35"
                        cy="35"
                        r={radius}
                        stroke='#d11ffa'
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </Svg>
                <Text style={percentageCircleStyles.percentageText}>
                    {Math.round(percentage)}%
                </Text>
            </View>
            <Text style={percentageCircleStyles.valueText}>
                {value.toFixed(1)}/{macroGoal.toFixed(1)}g
            </Text>
        </View>
    );
};

export default PercentageCircle;