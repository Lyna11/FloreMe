import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../config/firebaseConfig";
import { useRouter } from "expo-router";

const Logout: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Déconnecte l'utilisateur de Firebase
      await signOut(auth);
      // Supprime la session utilisateur stockée localement
      await AsyncStorage.removeItem("user");
      console.log("Utilisateur déconnecté avec succès.");
      // Redirige vers la page de connexion
      router.replace("../auth/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Are you sure you want to logout?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#d32f2f",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: 150,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Logout;
