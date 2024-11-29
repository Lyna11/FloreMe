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
      "Choose an action",

      "Select an option:",

      [
        {
          text: "Take a photo",

          onPress: captureImageWithCamera,
        },
        {
          text: "Select an image",

          onPress: pickImageFromGallery,
        },
        { text: "Cancel", style: "cancel" },
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
      alert("Camera permission denied!");
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
      alert("Permission denied to access the gallery!");
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
        setPlantName("Processing error");
        return;
      }

      const result = await serverResponse.json();
      if (result.suggestions && result.suggestions.length > 0) {
        setPlantName(result.suggestions[0].plant_name);
      } else {
        setPlantName("Plant not found");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'image:", error);
      setPlantName("Processing error");
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
    height: 350,
    resizeMode: "cover",
    marginBottom: 10,
    transform: [{ scale: 1.5 }],
    paddingTop: 50,
    marginTop: 50,
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 100,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
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
