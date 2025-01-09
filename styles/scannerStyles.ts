import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const scannerStyles = StyleSheet.create({
    mainContent: {
        flex: 1,
        paddingBottom: 60, // Account for bottom navigation
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#709afc',
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    cameraContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 140,
        marginBottom: 80,
    },
    camera: {
        width: width - 40,
        height: width - 40,
        marginVertical: 20,
    },
    instructionText: {
        fontSize: 15,
        color: '#b048fa',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    resultsContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
    },
    loadingIndicator: {
        marginTop: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    circleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
    circleValueContainer: {
        alignItems: 'center',
        marginBottom: 10,
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