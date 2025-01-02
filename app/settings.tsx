import React from 'react';
import { View, Text } from 'react-native';
import { BottomNavigation } from '../components/bottomNavigation';
import styles from '../styles/styles';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <BottomNavigation />
        </View>
    );
};

export default SettingsScreen;