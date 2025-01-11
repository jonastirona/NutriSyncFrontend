import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CAMERA_SIZE = width * 0.8;

const scannerStyles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: -150
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    scannerSection: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: -30
    },
    cameraWrapper: {
        width: CAMERA_SIZE,
        height: CAMERA_SIZE,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 20,
        backgroundColor: '#18183C'
    },
    camera: {
        flex: 1
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(24, 24, 60, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scanArea: {
        width: CAMERA_SIZE * 0.7,
        height: CAMERA_SIZE * 0.7,
        borderWidth: 2,
        borderColor: '#709afc',
        backgroundColor: 'transparent'
    },
    resultsSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    errorContainer: {
        alignItems: 'center',
        padding: 20
    },
    nutritionCard: {
        backgroundColor: '#22224a',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        maxWidth: 400,
        marginTop: -40
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#709afc', // Light Blue
        textAlign: 'center',
      },
    subtitle: {
        fontSize: 18,
        color: '#b048fa', // Purple
        textAlign: 'center',
    },
});

export default scannerStyles;