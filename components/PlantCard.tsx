import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icône FontAwesome.

interface Plant {
  id: number;
  common_name: string | null;
  scientific_name: string[];
  default_image: { regular_url: string } | null;
}

interface PlantCardProps {
  plant: Plant;
  onPress: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onPress }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={{
          uri: plant.default_image?.regular_url || 'https://via.placeholder.com/150',
        }}
        style={styles.image}
      />
      <Text style={styles.commonName}>{plant.common_name || 'Nom commun inconnu'}</Text>
      <Text style={styles.scientificName}>
        {plant.scientific_name.join(', ') || 'Nom scientifique inconnu'}
      </Text>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
        <Icon
          name={isFavorite ? 'heart' : 'heart-o'} // Icône pleine ou vide.
          size={20}
          color={isFavorite ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignItems: 'center', 
    position: 'relative', 
  },
  image: {
    height: 150,
    width: '100%',
  },
  commonName: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  scientificName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  favoriteIcon: {
    position: 'absolute', // Position absolue pour placer l'icône.
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Légèrement transparent.
    borderRadius: 20,
    padding: 5, 
  },
});

export default PlantCard;
