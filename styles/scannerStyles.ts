import { StyleSheet } from 'react-native';

const scannerStyles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    topContent: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(24, 24, 60, 0.5)', // Deep Blue with opacity
    },
    bottomContent: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(24, 24, 60, 0.5)', // Deep Blue with opacity
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
});

export default scannerStyles;