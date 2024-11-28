import React, { useState, useEffect } from "react";
import {
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import Header from "../shared/header";
import Footer from "../shared/footer";
import { router } from "expo-router";

interface Plant {
  id: number;
  common_name: string;
}

const PlantMapComponent = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Plant[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<number | null>(null);
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  const { width, height } = Dimensions.get("window"); // Obtenir les dimensions de l'écran

  useEffect(() => {
    if (query.length > 2) {
      fetch(
        `https://perenual.com/api/species-list?key=sk-3O5R6745e306933a7778&q=${query}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des suggestions :",
            error
          );
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelectPlant = (plantId: number) => {
    setSelectedPlantId(plantId);
    const url = `https://perenual.com/api/hardiness-map?key=sk-3O5R6745e306933a7778&species_id=${plantId}`;
    setMapUrl(url);
  };

  if (selectedPlantId !== null && mapUrl) {
    if (Platform.OS === "web") {
      WebBrowser.openBrowserAsync(mapUrl);
      return <Text>Opened on the browser...</Text>; // Message d'attente
    } else {
      return WebBrowser.openBrowserAsync(mapUrl);
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title="Plant Map"
        onIconPress={() => router.replace("/map/map")}
      />
      <ImageBackground
        source={require("../../assets/images/map8.jpg")}
        style={styles.background}
        resizeMode="cover"
      ></ImageBackground>
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="ℱ𝒾𝓃𝒹 𝓎𝑜𝓊𝓇 𝓅𝓁𝒶𝓃𝓉 𝑜𝓃 𝓉𝒽𝑒 𝓂𝒶𝓅..."
              value={query}
              onChangeText={(text) => setQuery(text)}
              placeholderTextColor="black"
            />
          </View>

          {/* Afficher la liste des suggestions de manière restreinte */}
          {suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectPlant(item.id)}
                    style={styles.suggestionItemContainer}
                  >
                    <Text style={styles.suggestionItem}>
                      {item.common_name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </ScrollView>
      </View>
      <Footer
        onHomePress={() => router.replace("/pernual_api/searchPlant")}
        onFavoritePress={() => router.replace("/favoris/plantfavoris")}
        onCartPress={() => router.replace("/plantid_api/imagePickerComponent")}
        onProfilePress={() => router.replace("/profile/profile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  background: {
    width: "100%",
    height: 700,
    resizeMode: "cover",
    marginTop: 35,
    paddingTop: 10,
    marginBottom: 10,
    transform: [{ scale: 1.2 }],
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start", // Commence directement sous le Header
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 16,
    paddingTop: Platform.OS === "android" ? 20 : 0, // Ajout pour espacer selon l'appareil
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 16,
  },
  searchContainer: {
    width: "100%",
    marginBottom: 50,
    marginTop: 120,
    backgroundColor: "white",
    flexGrow: 0, // Empêche la barre de recherche de croître
  },
  searchBar: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    padding: 14,
    fontSize: 20,
    width: "100%", // Assurez-vous que cette propriété est définie
    fontWeight: "bold",
    textAlign: "left", // Pour aligner le texte sans influencer la largeur
    flexGrow: 0, // Empêche la barre de recherche de croître
  },
  suggestionsContainer: {
    width: "90%",
    maxHeight: 300,
    overflow: "hidden",
  },
  suggestionItemContainer: {
    marginBottom: 8,
  },
  suggestionItem: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    overflow: "hidden",
  },
});

export default PlantMapComponent;
