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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#D4A5FF',
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
        backgroundColor: '#1A1A2E',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    modalButtonText: {
        color: '#A390E4',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#1A1A2E',
    },
});

export default searchStyles;