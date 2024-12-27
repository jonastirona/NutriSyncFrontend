import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import PercentageCircle from '../components/percentageCircle';
import PercentageBar from '../components/percentageBar';
import FoodLog from '../components/foodLog';
import { BottomNavigation } from '../components/bottomNavigation';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { format, subDays, addDays, isToday } from 'date-fns';
import { PanGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function Home() {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const translateX = useRef(new Animated.Value(0)).current;
    const username = "username";
    const title = `${username}'s Dashboard`;

    const getFontSize = (text: string) => {
        if (text.length > 20) return 24;
        if (text.length > 15) return 28;
        return 32;
    };

    const navigateTo = (screen: string) => {
        navigation.reset({
            index: 0,
            routes: [{ name: screen as never }],
        });
    };

    const handleYesterday = () => {
        setSelectedDate(subDays(selectedDate, 1));
        animateSwipe(-width);
    };

    const handleTomorrow = () => {
        setSelectedDate(addDays(selectedDate, 1));
        animateSwipe(width);
    };

    const animateSwipe = (toValue: number) => {
        Animated.timing(translateX, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            translateX.setValue(0);
        });
    };

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = ({ nativeEvent }: { nativeEvent: { state: number; translationX: number } }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX < -50) {
                handleTomorrow();
            } else if (nativeEvent.translationX > 50) {
                handleYesterday();
            } else {
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    const yesterdayDate = format(subDays(selectedDate, 1), 'MM/dd/yy');
    const tomorrowDate = format(addDays(selectedDate, 1), 'MM/dd/yy');
    const currentDate = format(selectedDate, 'MM/dd/yy');

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={[localStyles.title, { fontSize: getFontSize(title) }]}>{title}</Text>
                <View style={localStyles.dateNavigation}>
                    <TouchableOpacity onPress={handleYesterday} style={localStyles.dateButton}>
                        <Text style={localStyles.dateButtonText}>{`<< ${yesterdayDate}`}</Text>
                    </TouchableOpacity>
                    <View style={localStyles.currentDateContainer}>
                        <Text style={localStyles.dateText}>
                            {currentDate}{' '}
                            {isToday(selectedDate) && <Text style={localStyles.todayText}>(Today)</Text>}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleTomorrow} style={localStyles.dateButton}>
                        <Text style={localStyles.dateButtonText}>{`${tomorrowDate} >>`}</Text>
                    </TouchableOpacity>
                </View>
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View style={{ transform: [{ translateX }] }}>
                        <ScrollView style={localStyles.scrollView}>
                            <View style={styles.circleContainer}>
                                <PercentageCircle
                                    label="Protein"
                                    percentage={40}
                                    value={40}
                                />
                                <PercentageCircle
                                    label="Carbs"
                                    percentage={60}
                                    value={60}
                                />
                                <PercentageCircle
                                    label="Fat"
                                    percentage={110}
                                    value={110}
                                />
                            </View>
                            <PercentageBar label="Calorie Goal" percentage={80} value={80} />
                            <FoodLog />
                            <View style={localStyles.buttonContainer}>
                                <TouchableOpacity style={localStyles.button} onPress={() => navigateTo('Search')}>
                                    <Text style={localStyles.buttonText}>Add Food</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={localStyles.button} onPress={() => navigateTo('Scanner')}>
                                    <Text style={localStyles.buttonText}>Scan Barcode</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Animated.View>
                </PanGestureHandler>
                <BottomNavigation />
            </View>
        </GestureHandlerRootView>
    );
}

const localStyles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#1A1A2E',
        borderColor: '#D4A5FF',
        borderWidth: 1,
    },
    title: {
        fontWeight: 'bold',
        color: '#D4A5FF',
        marginTop: 75,
        textAlign: 'center',
    },
    dateNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#A390E4',
        borderRadius: 5,
    },
    dateButtonText: {
        color: '#1A1A2E',
        fontWeight: 'bold',
    },
    currentDateContainer: {
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#D4A5FF',
    },
    todayText: {
        fontSize: 12,
        color: '#D4A5FF',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 0,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#A390E4',
        paddingVertical: 16,
        paddingHorizontal: 5,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 15,
        color: '#1A1A2E',
        fontWeight: 'bold',
    },
});
