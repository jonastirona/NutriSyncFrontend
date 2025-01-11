import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { BottomNavigation } from '../components/bottomNavigation';
import PercentageCircle from '../components/percentageCircle';
import PercentageBar from '../components/percentageBar';
import AddFood from '../components/addFood';
import styles from '../styles/styles';
import searchStyles from '../styles/searchStyles';
import { searchFood, loadMoreResults } from '../services/api';
import { useUser } from '../context/userContext';

// interface for food nutrient
interface FoodNutrient {
    nutrientName: string;
    value: number;
}

// interface for food item
interface FoodItem {
    fdcId: number;
    description: string;
    foodNutrients: FoodNutrient[];
}

// Search component
const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [totalHits, setTotalHits] = useState(0);
    const pageSize = 30;

    const { username } = useUser();

    const resetStates = () => {
        setSearchResults([]);
        setExpandedItem(null);
        setSearchPage(1);
        setHasMore(true);
        setTotalHits(0);
    };

    // function to fetch initial food list
    const fetchInitialFoodList = async () => {
        setLoading(true);
        setError('');
        resetStates();
        try {
            const data = await searchFood('', 1, pageSize);
            const filteredFoods = data.foods.filter((food: { dataType: string; }) => food.dataType !== 'Experimental');
            if (filteredFoods.length === 0) {
                setError('No food items found.');
            } else {
                setSearchResults(filteredFoods);
                setTotalHits(data.totalHits);
                // Check if there are more pages based on total hits
                setHasMore(filteredFoods.length < data.totalHits);
            }
        } catch (error: any) {
            setError(`Error fetching data: ${error.message}`);
            console.error('Error fetching food data:', error);
        } finally {
            setLoading(false);
        }
    };

    //  function to search food
    const handleSearchFood = async () => {
        setLoading(true);
        setError('');
        resetStates();
        try {
            const data = await searchFood(keyword, 1, pageSize);
            const filteredFoods = data.foods.filter((food: { dataType: string; }) => food.dataType !== 'Experimental');
            if (filteredFoods.length === 0) {
                setError('No food items found. Please try another search');
            } else {
                setSearchResults(filteredFoods);
                setTotalHits(data.totalHits);
                setHasMore(filteredFoods.length < data.totalHits);
            }
        } catch (error: any) {
            setError(`Error fetching data: ${error.message}`);
            console.error('Error fetching food data:', error);
        } finally {
            setLoading(false);
        }
    };

    // function to load more results
    const handleLoadMoreResults = async () => {
        if (loadingMore || !hasMore || loading) return;

        const nextPage = searchPage + 1;
        
        // Check if we've already loaded all results
        if (searchResults.length >= totalHits) {
            setHasMore(false);
            return;
        }

        setLoadingMore(true);
        try {
            const data = await loadMoreResults(keyword, nextPage, pageSize);
            const filteredFoods = data.foods.filter((food: { dataType: string; }) => food.dataType !== 'Experimental');
            
            if (filteredFoods.length > 0) {
                setSearchResults(prevResults => [...prevResults, ...filteredFoods]);
                setSearchPage(nextPage);
                setHasMore(searchResults.length + filteredFoods.length < data.totalHits);
            } else {
                setHasMore(false);
            }
        } catch (error: any) {
            console.error('Error fetching more data', error);
            setError(`Error fetching more data: ${error.message}`);
        } finally {
            setLoadingMore(false);
        }
    };

    // function to toggle expand item
    const toggleExpand = (index: number) => {
        setExpandedItem(expandedItem === index ? null : index);
    };

    // function to render item
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
                            value={item.foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value || 0}
                        />
                        <PercentageCircle
                            label="Protein"
                            value={item.foodNutrients.find((n) => n.nutrientName === 'Protein')?.value || 0}
                        />
                        <PercentageCircle
                            label="Carbs"
                            value={item.foodNutrients.find(
                                (n) => n.nutrientName === 'Carbohydrate, by difference'
                            )?.value || 0}
                        />
                    </View>
                    <View style={searchStyles.calorieContainer}>
                        <PercentageBar
                            label="Calories"
                            value={
                                item.foodNutrients.find((n) => n.nutrientName === 'Energy')?.value || 0
                            }
                        />
                    </View>
                    {/* AddFood component */}
                    <AddFood
                        username={username}
                        fooditem={item.description}
                        calories={item.foodNutrients.find((n) => n.nutrientName === 'Energy')?.value || 0}
                        protein={item.foodNutrients.find((n) => n.nutrientName === 'Protein')?.value || 0}
                        carbs={item.foodNutrients.find((n) => n.nutrientName === 'Carbohydrate, by difference')?.value || 0}
                        fat={item.foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value || 0}
                        onPress={(success: boolean) => {
                            console.log('AddFood onPress called with success:', success); // Log when onPress is called
                            setMessage(success ? 'Food added to log' : 'Failed to add food to log');
                            setModalVisible(true);
                        }}
                    />
                </View>
            )}
        </View>
    );

    // fetch initial food list on component mount
    useEffect(() => {
        fetchInitialFoodList();
    }, []);

    // render component
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={searchStyles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search for food"
                        placeholderTextColor="#A390E4"
                        value={keyword}
                        onChangeText={setKeyword}
                    />
                    <TouchableOpacity style={searchStyles.button} onPress={handleSearchFood}>
                        <Text style={searchStyles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={searchStyles.centeredView}>
                        <View style={searchStyles.modalView}>
                            <Text style={searchStyles.modalText}>{message}</Text>
                            <TouchableOpacity
                                style={searchStyles.modalButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={searchStyles.modalButtonText}>Dismiss</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {error ? <Text style={styles.subtitle}>{error}</Text> : null}
                {loading && <ActivityIndicator size="large" color={styles.title.color} />}
                
                <View style={{ marginBottom: 250 }}> 
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.fdcId.toString()}
                        renderItem={renderItem}
                        onEndReached={handleLoadMoreResults}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            loadingMore ? (
                                <ActivityIndicator size="small" color={styles.title.color} />
                            ) : hasMore ? (
                                <Text style={styles.subtitle}>Scroll for more...</Text>
                            ) : searchResults.length > 0 ? (
                                <Text style={styles.subtitle}>No more results</Text>
                            ) : null
                        }
                    />
                </View>
                <BottomNavigation />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Search;