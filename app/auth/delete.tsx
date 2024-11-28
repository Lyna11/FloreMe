import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface DeleteAccountProps {
  visible: boolean;
  onClose: () => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ visible, onClose }) => {
  const [password, setPassword] = useState("");

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erreur", "Aucun utilisateur connecté");
      return;
    }

    if (!password) {
      Alert.alert("Erreur", "Veuillez entrer votre mot de passe");
      return;
    }

    try {
      // Authentifier l'utilisateur avant suppression
      const credential = EmailAuthProvider.credential(
        user.email || "",
        password
      );
      await reauthenticateWithCredential(user, credential);

      // Supprimer l'utilisateur dans Firebase
      await deleteUser(user);

      // Supprimer la session de AsyncStorage
      await AsyncStorage.removeItem("user");

      Alert.alert("Succès", "Votre compte a été supprimé avec succès.");
      onClose(); // Fermer la modal après suppression
      router.replace("/auth/signup");
    } catch (error) {
      Alert.alert(
        "Erreur",
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
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
          <Text style={styles.modalTitle}>Delete Account</Text>
          <Text style={styles.modalDescription}>
            Pour supprimer votre compte, veuillez entrer votre mot de passe.
          </Text>

          {/* Champ de mot de passe */}
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteButtonText}>Supprimer mon compte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    padding: 10,
  },
  cancelButtonText: {
    color: "#1976D2",
    fontSize: 16,
  },
});

export default DeleteAccount;
