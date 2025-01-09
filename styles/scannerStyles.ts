import { StyleSheet } from 'react-native';

const scannerStyles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    topContent: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(24, 24, 60, 0.5)', // Deep Blue
    },
    bottomContent: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(24, 24, 60, 0.5)', // Deep Blue
    },
    circleValueContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    smallerCircle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#d11ffa', // Bright Pink
    },
    smallerCircleText: {
        fontSize: 16,
        color: '#b048fa', // Purple
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
    },
    loadingIndicator: {
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    circleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    percentageBarContainer: {
        width: '100%',
        marginBottom: 20,
    },
    addFoodContainer: {
        width: '100%',
    },
});

export default scannerStyles;