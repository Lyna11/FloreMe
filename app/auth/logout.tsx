import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../config/firebaseConfig";
import { router } from "expo-router";

interface LogoutProps {
  visible: boolean;
  onClose: () => void;
}

const Logout: React.FC<LogoutProps> = ({ visible, onClose }) => {
  const handleLogout = async () => {
    try {
      // Déconnecte l'utilisateur de Firebase
      await signOut(auth);
      // Supprime la session utilisateur stockée localement
      await AsyncStorage.removeItem("user");
      Alert.alert("Succès", "Vous êtes déconnecté.");
      onClose(); // Fermer la modal après déconnexion
      router.replace("/auth/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>Are you sure you want to logout?</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
            <Text style={styles.buttonCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
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
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonCancel: {
    backgroundColor: "#757575",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: 150,
  },
  buttonCancelText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Logout;
