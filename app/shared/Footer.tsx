import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 

type FooterProps = {
  onHomePress: () => void;
  onFavoritePress: () => void;
  onCartPress: () => void;
  onProfilePress: () => void;
};

const Footer: React.FC<FooterProps> = ({
  onHomePress,
  onFavoritePress,
  onCartPress,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onHomePress} style={styles.iconContainer}>
        <Ionicons name="home-outline" size={27} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onFavoritePress} style={styles.iconContainer}>
        <Ionicons name="heart-outline" size={27} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCartPress} style={styles.iconContainer}>
        <Ionicons name="camera-outline" size={27} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onProfilePress} style={styles.iconContainer}>
        <Ionicons name="person-outline" size={27} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 25,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default Footer;
