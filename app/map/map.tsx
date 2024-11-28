import React, { useState, useEffect } from 'react';
import { TextInput, FlatList, Text, TouchableOpacity, View, ImageBackground, StyleSheet, Platform, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Header from '../shared/header';
import Footer from '../shared/footer';
import { router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Import des icônes

interface Plant {
  id: number;
  common_name: string;
}

const PlantMapComponent = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Plant[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<number | null>(null);
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [isBrowserOpen, setIsBrowserOpen] = useState<boolean>(false);

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://perenual.com/api/species-list?key=sk-G7ju6746e229d6d0b7737&q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des suggestions :", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelectPlant = async (plantId: number) => {
    setSelectedPlantId(plantId);
    const url = `https://perenual.com/api/hardiness-map?key=sk-G7ju6746e229d6d0b7737&species_id=${plantId}`;
    setMapUrl(url);

    // Ouvrir le navigateur
    setIsBrowserOpen(true);
    await WebBrowser.openBrowserAsync(url);
    setIsBrowserOpen(false); // Revient une fois que l'utilisateur quitte le navigateur
  };

  const handleCloseBrowser = () => {
    WebBrowser.dismissBrowser(); // Ferme explicitement le navigateur
    setIsBrowserOpen(false);
  };

  const clearInput = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <View style={styles.containerGlobal}>
      <Header
        title="Plant Map"
        onIconPress={() => router.replace("/map/map")}
      />
      <ImageBackground
        source={require('../../assets/images/map8.jpg')} // Remplacez par le chemin de votre image
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Rechercher une plante..."
              placeholderTextColor="#888"
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
                <Text>
                  <Ionicons name="close-circle" size={24} color="#888" /> {/* Icône enveloppée dans un <Text> */}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectPlant(item.id)}>
                  <Text style={styles.suggestionText}>{item.common_name}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
            />
          )}
        </View>
        <Footer
          onHomePress={() => router.replace("/pernual_api/searchPlant")}
          onFavoritePress={() => router.replace("/favoris/plantfavoris")}
          onCartPress={() => router.replace("/plantid_api/imagePickerComponent")}
          onProfilePress={() => router.replace("/profile/profile")}
        />
      </ImageBackground>

      {isBrowserOpen && (
        <View style={styles.browserOverlay}>
          <Button title="Revenir à l'application" onPress={handleCloseBrowser} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerGlobal: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond semi-transparent
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    marginTop: -35,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    position: 'relative',
  },
  searchBar: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  suggestionsList: {
    marginTop: 10,
    maxHeight: 300, // Limiter la hauteur pour le scroll
  },
  suggestionItem: {
    backgroundColor: '#FFF',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  browserOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    alignItems: 'center',
  },
});

export default PlantMapComponent;
