import { StyleSheet } from 'react-native';

const searchStyles = StyleSheet.create({
    searchContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: '#b048fa', // Purple
        borderWidth: 1,
        marginTop: 150,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#709afc', // Light Blue
        width: '90%',
    },
    button: {
        backgroundColor: '#d11ffa', // Bright Pink
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#18183C', // Deep Blue
        fontWeight: 'bold',
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#709afc', // Light Blue
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#709afc', // Light Blue
    },
    dropdown: {
        padding: 10,
        backgroundColor: '#18183C', // Deep Blue
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
        borderColor: '#d11ffa', // Bright Pink
    },
    smallerCircleText: {
        fontSize: 16,
        color: '#b048fa', // Purple
    },
    calorieContainer: {
        marginTop: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#709afc', // Light Blue
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        backgroundColor: '#18183C', // Deep Blue
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    modalButtonText: {
        color: '#b048fa', // Purple
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#18183C', // Deep Blue
    },
});

export default searchStyles;