import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';
import HomeIcon from '../assets/images/home.png';
import SearchIcon from '../assets/images/search.png';
import ScannerIcon from '../assets/images/scanner.png';
import SettingsIcon from '../assets/images/settings.png';

// bottom navigation bar
export const BottomNavigation = () => {
  const navigation = useNavigation();

  type ScreenNames = 'home' | 'search' | 'scanner' | 'settings';

  // function to navigate to different screens
  const Navigate = (screen: ScreenNames) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screen as never }],
    });
  };

  // return bottom navigation bar
  return (
    <View style={styles.navContainer}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => Navigate('home')} style={styles.navButton}>
          <Image source={HomeIcon} style={styles.navButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Navigate('search')} style={styles.navButton}>
          <Image source={SearchIcon} style={styles.navButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Navigate('scanner')} style={styles.navButton}>
          <Image source={ScannerIcon} style={styles.navButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Navigate('settings')} style={styles.navButton}>
          <Image source={SettingsIcon} style={styles.navButtonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};