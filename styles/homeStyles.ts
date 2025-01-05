import { StyleSheet } from 'react-native';

const homeStyles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#1A1A2E',
        borderColor: '#D4A5FF',
        borderWidth: 1,
    },
    title: {
        fontWeight: 'bold',
        color: '#D4A5FF',
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

export default homeStyles;