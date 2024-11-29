import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router"; // Import de useRouter pour la navigation

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Hook pour la navigation

  useEffect(() => {
    // Masquer l'icône de chargement après 5 secondes et rediriger
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.replace("/auth/login"); // Rediriger vers la page 'nextPage'
    }, 5000);

    // Nettoyage du timer lorsque le composant se démonte
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ImageBackground
      source={require("../../assets/images/charegement.png")} // Remplacez par l'URL de votre image de fond
      style={styles.background}
    >
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.text}>Chargement terminé !</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1 }], // Redimensionner l'image de fond
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LoadingScreen;
