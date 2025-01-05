import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Animated, Dimensions, TouchableOpacity } from 'react-native';
import PercentageCircle from '../components/percentageCircle';
import PercentageBar from '../components/percentageBar';
import FoodLog from '../components/foodLog';
import { BottomNavigation } from '../components/bottomNavigation';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';
import homeStyles from '../styles/homeStyles';
import { format, subDays, addDays, isToday } from 'date-fns';
import { PanGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler';
import { useUser } from '../context/userContext';

const { width } = Dimensions.get('window');

export default function Home() {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const translateX = useRef(new Animated.Value(0)).current;
    const { username } = useUser();
    const title = `${username}'s Dashboard`;

    const [totals, setTotals] = useState({ calories: 0, fat: 0, protein: 0, carbs: 0 });

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

    const currentDate = format(selectedDate, 'yyyy-MM-dd');
    const displayYesterdayDate = format(subDays(selectedDate, 1), 'MM/dd/yy');
    const displayTomorrowDate = format(addDays(selectedDate, 1), 'MM/dd/yy');
    const displayCurrentDate = format(selectedDate, 'MM/dd/yy');

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={[homeStyles.title, { fontSize: getFontSize(title) }]}>{title}</Text>
                <View style={homeStyles.dateNavigation}>
                    <TouchableOpacity onPress={handleYesterday} style={homeStyles.dateButton}>
                        <Text style={homeStyles.dateButtonText}>{`<< ${displayYesterdayDate}`}</Text>
                    </TouchableOpacity>
                    <View style={homeStyles.currentDateContainer}>
                        <Text style={homeStyles.dateText}>
                            {displayCurrentDate}{' '}
                            {isToday(selectedDate) && <Text style={homeStyles.todayText}>(Today)</Text>}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleTomorrow} style={homeStyles.dateButton}>
                        <Text style={homeStyles.dateButtonText}>{`${displayTomorrowDate} >>`}</Text>
                    </TouchableOpacity>
                </View>
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View style={{ transform: [{ translateX }] }}>
                        <ScrollView style={homeStyles.scrollView}>
                            <View style={styles.circleContainer}>
                                <PercentageCircle
                                    label="Protein"
                                    value={totals.protein}
                                />
                                <PercentageCircle
                                    label="Carbs"
                                    value={totals.carbs}
                                />
                                <PercentageCircle
                                    label="Fat"
                                    value={totals.fat}
                                />
                            </View>
                            <PercentageBar label="Calorie Goal" value={totals.calories} />
                            <FoodLog date={currentDate} onTotalsCalculated={setTotals} />
                            <View style={homeStyles.buttonContainer}>
                                <TouchableOpacity style={homeStyles.button} onPress={() => navigateTo('search')}>
                                    <Text style={homeStyles.buttonText}>Add Food</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={homeStyles.button} onPress={() => navigateTo('scanner')}>
                                    <Text style={homeStyles.buttonText}>Scan Barcode</Text>
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