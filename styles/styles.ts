import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18183C', // Deep Blue
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#709afc', // Light Blue
    marginTop: 200,
    textAlign: 'center',
  },
  settingsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#709afc', // Light Blue
    marginTop: 150,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#b048fa', // Purple
    textAlign: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 10,
    color: '#b048fa', // Purple
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    width: '90%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#fcfcfc', // White
    color: '#709afc', // Light Blue
    fontSize: 16,
    marginVertical: 12,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 90,
  },
  button: {
    backgroundColor: '#d11ffa', // Bright Pink
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#18183C', // Deep Blue
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 14,
    color: '#b048fa', // Purple
    textAlign: 'center',
    marginTop: 0,
    textDecorationLine: 'underline',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#18183C', // Deep Blue
    borderTopWidth: 1,
    borderTopColor: '#b048fa', // Purple
    paddingHorizontal: 10,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 16,
    color: '#b048fa', // Purple
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  logo: {
    width: 250,
    height: 50,
    alignSelf: 'center',
    marginTop: 250,
  },
  navButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#709afc', // Light Blue
  },
});

export default styles;