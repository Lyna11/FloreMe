import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"; // Import Firestore functions
import { getApp } from "firebase/app"; // Import Firebase app
import { auth } from "../config/firebaseConfig"; // Import Firebase auth

export interface Plant {
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

  // Fonction pour gérer le changement d'état du favori et sauvegarder dans Firestore
  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      try {
        await saveToFirestore(plant);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde dans Firestore:", error);
      }
    }
  };

  // Fonction pour sauvegarder la plante dans Firestore
  const saveToFirestore = async (plant: Plant) => {
    const db = getFirestore(getApp());
    const plantsCollection = collection(db, "favoritePlants"); // Nom de la collection Firestore

    // Sauvegarder l'objet plante
    await addDoc(plantsCollection, {
      idut: auth.currentUser?.uid, // Ajout de l'ID de l'utilisateur
      id: plant.id,
      common_name: plant.common_name,
      createdAt: serverTimestamp(),
      default_image: plant.default_image?.regular_url,
    });
    console.log("Plante sauvegardée dans Firestore");
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{
          uri:
            plant.default_image?.regular_url ||
            "https://via.placeholder.com/150",
        }}
        style={styles.image}
      />
      <Text style={styles.commonName}>
        {plant.common_name || "Unknown common name"}
      </Text>
      <Text style={styles.scientificName}>
        {plant.scientific_name.join(", ") || "Unknown scientific name"}
      </Text>
      <TouchableOpacity
        onPress={toggleFavorite} // Appel de la fonction pour gérer l'ajout aux favoris
        style={styles.favoriteIcon}
      >
        <Icon
          name={isFavorite ? "heart" : "heart-o"} // Icône pleine ou vide
          size={20}
          color={isFavorite ? "red" : "gray"}
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
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#fff",
    alignItems: "center",
    position: "relative",
  },
  image: {
    height: 150,
    width: "100%",
  },
  commonName: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  scientificName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 5,
  },
});

export default PlantCard;
