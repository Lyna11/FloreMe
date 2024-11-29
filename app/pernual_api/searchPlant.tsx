import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import Header from "../shared/header";
import Footer from "../shared/footer";
import SearchInput from "@/components/SearchInput";
import PlantCard from "@/components/PlantCard";
import PlantModal from "@/components/PlantModal";
import { router } from "expo-router";

interface Section {
  type: string;
  description: string;
}

interface Plant {
  id: number;
  common_name: string | null;
  scientific_name: string[];
  default_image: { regular_url: string } | null;
}

interface PlantCareGuide extends Plant {
  section: Section[]; // Care guide sections
}

const SearchPlant: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [popularPlants, setPopularPlants] = useState<Plant[]>([]);
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<PlantCareGuide | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPopularPlants();
  }, []);

  const fetchPopularPlants = async () => {
    setLoading(true);
    try {
      const pagesToFetch = 5; // Vous pouvez changer ce nombre pour plus ou moins de pages.
      const fetches = [];

      for (let page = 1; page <= pagesToFetch; page++) {
        fetches.push(
          fetch(
            `https://perenual.com/api/species-list?key=sk-C0qf6749c5ca211a97824&page=${page}`
          )
            .then((response) => response.json())
            .then((data) => data.data || [])
        );
      }

      // Attendez que toutes les requêtes soient terminées et combinez les résultats.
      const results = await Promise.all(fetches);
      const allPlants = results.flat(); // Aplatir le tableau de tableaux pour obtenir un tableau unique.

      // Mélangez les plantes pour obtenir un ordre aléatoire.
      const shuffledPlants = allPlants.sort(() => Math.random() - 0.5);

      // Définissez les plantes populaires avec un sous-ensemble du résultat mélangé (par exemple, les 20 premières).
      setPopularPlants(shuffledPlants.slice(0, 20));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchPlantDetails = async (id: number) => {
    try {
      const response = await fetch(
        `https://perenual.com/api/species-care-guide-list?key=sk-C0qf6749c5ca211a97824&species_id=${id}`
      );
      const data = await response.json();
      setSelectedPlant(data.data[0]);
      setModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const searchPlants = async () => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://perenual.com/api/species-list?key=sk-C0qf6749c5ca211a97824&q=${query}`
      );
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Home" onIconPress={() => router.replace("/map/map")} />
      <SearchInput
        query={query}
        setQuery={setQuery}
        searchPlants={searchPlants}
      />
      <FlatList
        data={searchResults.length > 0 ? searchResults : popularPlants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlantCard plant={item} onPress={() => fetchPlantDetails(item.id)} />
        )}
      />
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}
      <PlantModal
        plant={selectedPlant}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
    width: "100%",
  },
});

export default SearchPlant;
