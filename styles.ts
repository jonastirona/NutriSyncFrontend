import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4A5FF',
    marginTop: 100,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#A390E4',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    width: '90%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#2D2D44',
    color: '#D4A5FF',
    fontSize: 16,
    marginVertical: 12,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#A390E4',
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#1A1A2E',
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 14,
    color: '#A390E4',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default styles;