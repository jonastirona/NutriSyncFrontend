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

// home component
export default function Home() {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const translateX = useRef(new Animated.Value(0)).current;
    const { username } = useUser();
    const title = `${username}'s Dashboard`;

    // function to determine font size based on text length
    const getFontSize = (text: string) => {
        if (text.length > 20) return 24;
        if (text.length > 15) return 28;
        return 32;
    };

    // function to navigate to a different screen
    const navigateTo = (screen: string) => {
        navigation.reset({
            index: 0,
            routes: [{ name: screen as never }],
        });
    };

    // function to handle the swipe gesture to change the date to yesterday
    const handleYesterday = () => {
        setSelectedDate(subDays(selectedDate, 1));
        animateSwipe(-width);
    };

    // function to handle the swipe gesture to change the date to tomorrow
    const handleTomorrow = () => {
        setSelectedDate(addDays(selectedDate, 1));
        animateSwipe(width);
    };

    // function to animate the swipe gesture
    const animateSwipe = (toValue: number) => {
        Animated.timing(translateX, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            translateX.setValue(0);
        });
    };

    // function to handle the gesture event
    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    // function to handle the state change of the gesture
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

    // get the date in the format mm/dd/yy
    const yesterdayDate = format(subDays(selectedDate, 1), 'MM/dd/yy');
    const tomorrowDate = format(addDays(selectedDate, 1), 'MM/dd/yy');
    const currentDate = format(selectedDate, 'MM/dd/yy');

    // render the home screen
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* title */}
                <Text style={[homeStyles.title, { fontSize: getFontSize(title) }]}>{title}</Text>
                
                {/* date navigation */}
                <View style={homeStyles.dateNavigation}>
                    <TouchableOpacity onPress={handleYesterday} style={homeStyles.dateButton}>
                        <Text style={homeStyles.dateButtonText}>{`<< ${yesterdayDate}`}</Text>
                    </TouchableOpacity>
                    <View style={homeStyles.currentDateContainer}>
                        <Text style={homeStyles.dateText}>
                            {currentDate}{' '}
                            {isToday(selectedDate) && <Text style={homeStyles.todayText}>(Today)</Text>}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleTomorrow} style={homeStyles.dateButton}>
                        <Text style={homeStyles.dateButtonText}>{`${tomorrowDate} >>`}</Text>
                    </TouchableOpacity>
                </View>

                {/* content */}
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View style={{ transform: [{ translateX }] }}>
                        <ScrollView style={homeStyles.scrollView}>
                            {/* nutrition info circles */}
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
                            {/* calorie info bars */}
                            <PercentageBar label="Calorie Goal" value={80} />
                            
                            {/* food log */}
                            <FoodLog date={currentDate} />
                            
                            {/* buttons for adding food and scanning barcodes */}
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
                {/* bottom navigation bar */}
                <BottomNavigation />
            </View>
        </GestureHandlerRootView>
    );
}