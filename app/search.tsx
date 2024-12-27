import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { BottomNavigation } from '../components/bottomNavigation';
import PercentageCircle from '../components/percentageCircle';
import PercentageBar from '../components/percentageBar';
import styles from '../styles';

interface FoodNutrient {
    nutrientName: string;
    value: number;
}

interface FoodItem {
    fdcId: number;
    description: string;
    foodNutrients: FoodNutrient[];
}

const SearchScreen = () => {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 10;

    const resetStates = () => {
        setSearchResults([]);
        setExpandedItem(null);
        setSearchPage(1);
        setHasMore(true);
    };


    const searchFood = async () => {
        setLoading(true);
        setError('');
        resetStates();
        try {
            const response = await fetch(
                `http://nutrisyncbackend-env.eba-2wtn6ifs.us-east-2.elasticbeanstalk.com/lookup?keyword=${encodeURIComponent(keyword)}&pageNum=1&size=${pageSize}`,
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.foods.length === 0) {
              setError('No food items found. Please try another search');
            } else {
             setSearchResults(data.foods);
              if(data.foods.length < pageSize){
                setHasMore(false);
              }
            }
        } catch (error: any) {
            setError(`Error fetching data: ${error.message}`);
            console.error('Error fetching food data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreResults = async () => {
       if (!keyword || loading || !hasMore) return;
        setLoading(true);
        try {
            const nextPage = searchPage + 1;
            const response = await fetch(
                `http://nutrisyncbackend-env.eba-2wtn6ifs.us-east-2.elasticbeanstalk.com/lookup?keyword=${encodeURIComponent(keyword)}&pageNum=${nextPage}&size=${pageSize}`,
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data.foods.length > 0) {
              setSearchResults([...searchResults, ...data.foods]);
              setSearchPage(nextPage);
                 if(data.foods.length < pageSize){
                    setHasMore(false);
                }
            }
           else {
                 setHasMore(false);
             }

        } catch (error: any) {
            console.error('Error fetching more data', error);
            setError(`Error fetching more data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (index: number) => {
        setExpandedItem(expandedItem === index ? null : index);
    };

    const renderItem = ({ item, index }: { item: FoodItem; index: number }) => (
        <View style={localStyles.itemContainer}>
            <TouchableOpacity onPress={() => toggleExpand(index)}>
                <Text style={localStyles.itemTitle}>{item.description}</Text>
            </TouchableOpacity>
            {expandedItem === index && (
                <View style={localStyles.dropdown}>
                    <View style={localStyles.percentageContainer}>
                        <PercentageCircle
                            label="Fat"
                            percentage={
                                item.foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value || 0
                            }
                             value={
                                item.foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value
                            }
                            circleStyle = {localStyles.smallerCircle}
                            textStyle = {localStyles.smallerCircleText}
                        />
                        <PercentageCircle
                            label="Protein"
                            percentage={
                                item.foodNutrients.find((n) => n.nutrientName === 'Protein')?.value || 0
                            }
                            value={
                                item.foodNutrients.find((n) => n.nutrientName === 'Protein')?.value
                            }
                             circleStyle = {localStyles.smallerCircle}
                            textStyle = {localStyles.smallerCircleText}
                        />
                        <PercentageCircle
                            label="Carbohydrates"
                            percentage={
                                item.foodNutrients.find(
                                    (n) => n.nutrientName === 'Carbohydrate, by difference',
                                )?.value || 0
                            }
                            value={
                                item.foodNutrients.find(
                                    (n) => n.nutrientName === 'Carbohydrate, by difference',
                                )?.value
                            }
                             circleStyle = {localStyles.smallerCircle}
                            textStyle = {localStyles.smallerCircleText}
                        />
                    </View>
                    <View style={localStyles.calorieContainer}>
                        <PercentageBar
                            label="Calories"
                            percentage={
                                item.foodNutrients.find((n) => n.nutrientName === 'Energy')?.value || 0
                            }
                            value = {
                                 item.foodNutrients.find((n) => n.nutrientName === 'Energy')?.value
                            }
                        />
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={localStyles.searchContainer}>
                <TextInput
                    style={localStyles.input}
                    placeholder="Search for food"
                    placeholderTextColor="#A390E4"
                    value={keyword}
                    onChangeText={setKeyword}
                />
                <TouchableOpacity style={localStyles.button} onPress={searchFood}>
                    <Text style={localStyles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {error ? <Text style={styles.subtitle}>{error}</Text> : null}
            {loading && <ActivityIndicator size="large" color={styles.title.color} />}
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.fdcId.toString()}
                renderItem={renderItem}
                onEndReached={loadMoreResults}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading ? <ActivityIndicator size="small" color={styles.title.color} /> : null}
            />
            <BottomNavigation />
        </View>
    );
};

const localStyles = StyleSheet.create({
    searchContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: '#A390E4',
        borderWidth: 1,
        marginTop: 150,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#D4A5FF',
        width: '90%',
    },
    button: {
        backgroundColor: '#A390E4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#1A1A2E',
        fontWeight: 'bold',
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D4A5FF',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D4A5FF',
    },
    dropdown: {
        padding: 10,
        backgroundColor: '#1A1A2E',
        marginTop: 10,
    },
    percentageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
      smallerCircle: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 5,
    },
    smallerCircleText: {
        fontSize: 16,
    },
      calorieContainer: {
        marginTop: 10
    },
});


export default SearchScreen;