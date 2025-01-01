import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { BottomNavigation } from '../components/bottomNavigation';
import PercentageCircle from '../components/percentageCircle';
import PercentageBar from '../components/percentageBar';
import styles from '../styles/styles';
import searchStyles from '../styles/searchStyles';
import { searchFood, loadMoreResults } from '../services/api';

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

    const handleSearchFood = async () => {
        setLoading(true);
        setError('');
        resetStates();
        try {
            const data = await searchFood(keyword, 1, pageSize);
            if (data.foods.length === 0) {
                setError('No food items found. Please try another search');
            } else {
                setSearchResults(data.foods);
                if (data.foods.length < pageSize) {
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

    const handleLoadMoreResults = async () => {
        if (!keyword || loading || !hasMore) return;
        setLoading(true);
        try {
            const nextPage = searchPage + 1;
            const data = await loadMoreResults(keyword, nextPage, pageSize);
            if (data.foods.length > 0) {
                setSearchResults([...searchResults, ...data.foods]);
                setSearchPage(nextPage);
                if (data.foods.length < pageSize) {
                    setHasMore(false);
                }
            } else {
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
        <View style={searchStyles.itemContainer}>
            <TouchableOpacity onPress={() => toggleExpand(index)}>
                <Text style={searchStyles.itemTitle}>{item.description}</Text>
            </TouchableOpacity>
            {expandedItem === index && (
                <View style={searchStyles.dropdown}>
                    <View style={searchStyles.percentageContainer}>
                        <PercentageCircle
                            label="Fat"
                            percentage={
                                item.foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value || 0
                            }
                            value={
                                item.foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value
                            }
                            circleStyle={searchStyles.smallerCircle}
                            textStyle={searchStyles.smallerCircleText}
                        />
                        <PercentageCircle
                            label="Protein"
                            percentage={
                                item.foodNutrients.find((n) => n.nutrientName === 'Protein')?.value || 0
                            }
                            value={
                                item.foodNutrients.find((n) => n.nutrientName === 'Protein')?.value
                            }
                            circleStyle={searchStyles.smallerCircle}
                            textStyle={searchStyles.smallerCircleText}
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
                            circleStyle={searchStyles.smallerCircle}
                            textStyle={searchStyles.smallerCircleText}
                        />
                    </View>
                    <View style={searchStyles.calorieContainer}>
                        <PercentageBar
                            label="Calories"
                            percentage={
                                item.foodNutrients.find((n) => n.nutrientName === 'Energy')?.value || 0
                            }
                            value={
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
            <View style={searchStyles.searchContainer}>
                <TextInput
                    style={searchStyles.input}
                    placeholder="Search for food"
                    placeholderTextColor="#A390E4"
                    value={keyword}
                    onChangeText={setKeyword}
                />
                <TouchableOpacity style={searchStyles.button} onPress={handleSearchFood}>
                    <Text style={searchStyles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {error ? <Text style={styles.subtitle}>{error}</Text> : null}
            {loading && <ActivityIndicator size="large" color={styles.title.color} />}
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.fdcId.toString()}
                renderItem={renderItem}
                onEndReached={handleLoadMoreResults}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading ? <ActivityIndicator size="small" color={styles.title.color} /> : null}
            />
            <BottomNavigation />
        </View>
    );
};

export default SearchScreen;