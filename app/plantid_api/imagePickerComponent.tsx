import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons"; // Icône pour le bouton
import Footer from "../shared/footer";
import { useRouter } from "expo-router";
import Header from "../shared/header";

const ImagePickerComponent = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [plantName, setPlantName] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(true); // Gérer l'affichage en fonction de l'image

  const handleImagePicker = async () => {
    Alert.alert(
      "Choisir une action",
      "Sélectionnez une option :",
      [
        {
          text: "Prendre une photo",
          onPress: captureImageWithCamera,
        },
        {
          text: "Sélectionner une image",
          onPress: pickImageFromGallery,
        },
        { text: "Annuler", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const captureImageWithCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setShowContent(false); // Masquer le fond lorsque l'image est capturée
        fetchPlantName(result.assets[0].uri); // Appeler la fonction pour récupérer le nom de la plante
      }
    } else {
      alert("Permission caméra refusée !");
    }
  };

  const pickImageFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setShowContent(false); // Masquer le fond lorsque l'image est choisie
        fetchPlantName(result.assets[0].uri); // Appeler la fonction pour récupérer le nom de la plante
      }
    } else {
      alert("Permission refusée pour accéder à la galerie !");
    }
  };

  const fetchPlantName = async (uri: string) => {
    try {
      const base64Image = await convertUriToBase64(uri);

      const formData = new FormData();
      formData.append("images", JSON.stringify([base64Image]));

      const apiUrl = "https://api.plant.id/v2/identify";
      const apiKey = "N5NZ7GkXrrA9hovh8UN6OjfTYQr2Ygc8RnijDdn8YA9gR9EL4o";

      const serverResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Api-Key": apiKey,
        },
        body: formData,
      });

      if (!serverResponse.ok) {
        const errorText = await serverResponse.text();
        console.error("Erreur du serveur:", errorText);
        setPlantName("Erreur de traitement");
        return;
      }

      const result = await serverResponse.json();
      if (result.suggestions && result.suggestions.length > 0) {
        setPlantName(result.suggestions[0].plant_name);
      } else {
        setPlantName("Plante non trouvée");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image:", error);
      setPlantName("Erreur de traitement");
    }
  };

  const convertUriToBase64 = async (uri: string) => {
    try {
      const base64String = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64String;
    } catch (error) {
      console.error("Erreur lors de la conversion en Base64:", error);
      throw new Error("Erreur de conversion en Base64");
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Identify plants"
        onIconPress={() => router.replace("/map/map")}
      />
      {/* Masquer l'image de fond et les boutons lorsque showContent est false */}
      {showContent ? (
        <ImageBackground
          source={require("../../assets/images/cameraplant2.png")}
          style={styles.image}
        ></ImageBackground>
      ) : null}
      {/* Affichage conditionnel selon l'image sélectionnée */}
      {showContent && (
        <TouchableOpacity
          onPress={handleImagePicker}
          style={styles.iconContainer}
        >
          <Ionicons name="scan-circle-outline" size={50} color="black" />
          <Text style={styles.buttonText}>Choose or take a photo</Text>
        </TouchableOpacity>
      )}

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <Text style={styles.plantName}>Plant name : {plantName}</Text>
        </View>
      )}

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
  image: {
    width: "100%",
    height: 350, // Taille fixe de l'image
    resizeMode: "cover",
    marginBottom: 10, // Réduit l'espace entre l'image et les icônes
    transform: [{ scale: 1.5 }],
    paddingTop: 50,
    marginTop: 50,
  },
  iconContainer: {
    flexDirection: "column", // Changer la direction en colonne
    justifyContent: "center", // Centrer les éléments verticalement
    alignItems: "center", // Centrer les éléments horizontalement
    marginVertical: 100,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5, // Espacement entre l'icône et le text
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  imagePreview: {
    width: 300,
    height: 400,
    alignSelf: "center",
    marginVertical: 16,
    borderRadius: 10,
    // monter l'image pour laisser de l'espace pour le nom de la plante
  },
  plantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 8,
  },
});

export default ImagePickerComponent;
