import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../shared/header";
import Footer from "../shared/footer";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Bibliothèque pour les icônes
import PlantModal from "@/components/PlantModal";

const PlantFavoris = () => {
  const [userIdut, setUserIdut] = useState<string | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState<PlantCareGuide | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const getUserId = async () => {
    const userString = await AsyncStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return user?.uid || null;
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const uid = await getUserId();
      setUserIdut(uid);
    };

    fetchUserId();
  }, []);

  interface Plant {
    id: string;
    default_image: string;
    common_name: string;
    plant_id: number;
  }

  interface Section {
    type: string;
    description: string;
  }

  interface PlantCareGuide {
    common_name: string | null;
    scientific_name: string[];
    section: Section[];
  }

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const firestore = getFirestore();
        const plantsCollection = collection(firestore, "favoritePlants");
        const q = query(plantsCollection, where("idut", "==", userIdut));
        const snapshot = await getDocs(q);

        const plantsList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            default_image: data.default_image,
            common_name: data.common_name,
            plant_id: data.id, // Ajout de l'ID de la plante pour l'API
          };
        });

        setPlants(plantsList);
      } catch (error) {
        console.error("Erreur lors de la récupération des plantes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userIdut) {
      fetchPlants();
    }
  }, [userIdut]);

  const handleDeletePlant = async (plantId: string) => {
    try {
      const firestore = getFirestore();
      const plantDoc = doc(firestore, "favoritePlants", plantId);
      await deleteDoc(plantDoc);

      // Mettre à jour la liste des plantes après suppression
      setPlants((prevPlants) =>
        prevPlants.filter((plant) => plant.id !== plantId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la plante:", error);
    }
  };

  const handlePlantPress = async (plantId: number) => {
    try {
      const url = `https://perenual.com/api/species-care-guide-list?key=sk-3O5R6745e306933a77785&species_id=${plantId}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.error("Erreur de réponse de l'API:", response.status);
        return;
      }

      const result = await response.json();

      if (result && result.data && Array.isArray(result.data)) {
        const plantData = result.data[0]; // On suppose que vous avez seulement une plante dans "data"

        // Vérification des propriétés avant d'utiliser map()
        const scientificName = plantData.scientific_name || []; // Utilisation d'un tableau vide par défaut
        const section = plantData.section || []; // Utilisation d'un tableau vide par défaut

        // Vérification que les propriétés sont des tableaux avant d'appliquer .map()
        if (Array.isArray(scientificName) && Array.isArray(section)) {
          setSelectedPlant(plantData); // Assurez-vous que plantData contient des informations valides
          setModalVisible(true);
        } else {
          console.error(
            "Les données scientifiques ou les sections ne sont pas valides."
          );
        }
      } else {
        console.error("Les données retournées sont invalides ou vides.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de la plante:",
        error
      );
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (plants.length === 0) {
    return (
      <View style={styles.noFavoritesContainer}>
        <Header
          title="Favoris"
          onIconPress={() => console.log("Icône de la Terre pressée!")}
        />
        <Text style={styles.noFavoritesText}>
          Vous n'avez pas encore de plantes favorites.
        </Text>
        <Text
          style={styles.addFavoriteLink}
          onPress={() => router.replace("../pernual_api/searchPlant")}
        >
          Ajoutez-en maintenant !
        </Text>
        <Footer
          onHomePress={() => router.replace("/pernual_api/searchPlant")}
          onFavoritePress={() => router.replace("/favoris/plantfavoris")}
          onCartPress={() =>
            router.replace("/plantid_api/imagePickerComponent")
          }
          onProfilePress={() => router.replace("/profile/profile")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Favoris"
        onIconPress={() => console.log("Icône de la Terre pressée!")}
      />
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.default_image }}
              style={styles.cardImage}
            />
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => handlePlantPress(item.plant_id)}
            >
              <Text style={styles.cardTitle}>{item.common_name}</Text>
              <Text style={styles.cardSubtitle}>
                Cliquez pour voir les détails de la plante
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeletePlant(item.id)}>
              <MaterialIcons
                name="delete"
                size={24}
                color="red"
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <Footer
        onHomePress={() => router.replace("/pernual_api/searchPlant")}
        onFavoritePress={() => router.replace("/favoris/plantfavoris")}
        onCartPress={() => router.replace("/plantid_api/imagePickerComponent")}
        onProfilePress={() => router.replace("/profile/profile")}
      />
      <PlantModal
        plant={selectedPlant}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
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
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 5,
  },
  deleteIcon: {
    marginLeft: 10,
  },
  noFavoritesContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addFavoriteLink: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default PlantFavoris;
