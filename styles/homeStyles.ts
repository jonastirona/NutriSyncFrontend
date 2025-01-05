import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#18183C', // Deep Blue
        borderColor: '#709afc', // Light Blue
        borderWidth: 1,
    },
    title: {
        fontWeight: 'bold',
        color: '#709afc', // Light Blue
        marginTop: 62,
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
        backgroundColor: '#d11ffa', // Bright Pink
        borderRadius: 5,
    },
    dateButtonText: {
        color: '#18183C', // Deep Blue
        fontWeight: 'bold',
    },
    currentDateContainer: {
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#709afc', // Light Blue
    },
    todayText: {
        fontSize: 12,
        color: '#709afc', // Light Blue
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 0,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#d11ffa', // Bright Pink
        paddingVertical: 16,
        paddingHorizontal: 5,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 15,
        color: '#18183C', // Deep Blue
        fontWeight: 'bold',
    },
});

export default homeStyles;