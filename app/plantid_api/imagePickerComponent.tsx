import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Footer from "../shared/footer";
import { useRouter } from "expo-router";

const ImagePickerComponent = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [plantName, setPlantName] = useState<string | null>(null);

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
        fetchPlantName(result.assets[0].uri);
      }
    }
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
        fetchPlantName(result.assets[0].uri);
      }
    } else {
      alert("Permission caméra refusée !");
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
        console.log(result);
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
    <ImageBackground
      source={require("../../assets/images/scan.png")} // Remplacez par le chemin de votre image
      style={styles.background}
    >
      <View style={styles.container}>
        <Button title="Sélectionner une image" onPress={pickImageFromGallery} />
        <Button
          title="Prendre une photo"
          onPress={captureImageWithCamera}
          color="#4CAF50"
        />

        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        {plantName && (
          <Text style={styles.plantName}>Nom de la plante: {plantName}</Text>
        )}

        <Footer
          onHomePress={() => console.log("home")}
          onFavoritePress={() => console.log("Favoris")}
          onCartPress={() => router.push("../plantid_api/ImagePickerComponent")}
          onProfilePress={() => console.log("Profil")}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent", // Garde la transparence pour voir le fond
    //affichage en bas de l'image pour laisser de l'espace pour le nom de la plante
    paddingTop: 700,
  },
  imagePreview: {
    width: 200,
    height: 200,
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
