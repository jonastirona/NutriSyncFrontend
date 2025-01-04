import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomNavigation } from '../components/bottomNavigation';
import { getUserGoal, setUserGoal } from '../services/api';
import styles from '../styles/styles';
import { useUser } from '../context/userContext';

// settings screen
const SettingsScreen = () => {
    const [goal, setGoal] = useState('');
    const [currentGoal, setCurrentGoal] = useState<string | null>(null);
    const navigation = useNavigation();
    const { username, resetUsername } = useUser();

    useEffect(() => {
        // fetch current goal from backend
        const fetchGoal = async () => {
            try {
                const data = await getUserGoal(username);
                if (data.length > 0) {
                    setCurrentGoal(data[0].user_calorie_goal);
                }
            } catch (error) {
                console.error('Error fetching goal:', error);
            }
        };

        fetchGoal();
    }, [username]);

    // function to set goal
    const handleSetGoal = async () => {
        try {
            await setUserGoal(username, goal);
            setCurrentGoal(goal);
            setGoal('');
        } catch (error) {
            console.error('Error setting goal:', error);
        }
    };

    // log when username has been reset
    useEffect(() => {
        if (username === '') {
            console.log('Username has been reset');
        }
    }, [username]);

    const handleLogout = () => {
        resetUsername(); // reset the global username
        navigation.reset({
            index: 0,
            routes: [{ name: 'login' as never }],
        });
    };

    // return settings screen
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>
                Your goal is the amount of calories you want to eat in a day. Please enter your goal below.
            </Text>
            {currentGoal && (
                <Text style={styles.subtitle}>Current Goal: {currentGoal} calories</Text>
            )}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter new goal"
                    placeholderTextColor="#A390E4"
                    value={goal}
                    onChangeText={setGoal}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSetGoal}>
                    <Text style={styles.buttonText}>Set Goal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <BottomNavigation />
        </View>
    );
};

export default SettingsScreen;