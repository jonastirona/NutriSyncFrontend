import { StyleSheet } from 'react-native';

const searchStyles = StyleSheet.create({
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
        marginTop: 10,
    },
});

export default searchStyles;