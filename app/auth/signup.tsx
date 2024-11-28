import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

import InputField from "@/components/InputField";
import TermsAndConditions from "@/components/TermsAndConditions";
import ErrorMessage from "@/components/ErrorMessage";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const saveUsername = async (username: string) => {
    try {
      await AsyncStorage.setItem("username", username);
    } catch (error) {
      console.error("Error saving username:", error);
    }
  };
  const handleSignup = async () => {
    setMessage("");

    if (!validateEmail(email)) {
      setMessage("L'e-mail n'est pas valide");
      return;
    }

    if (password !== confirmationPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmationPassword.trim()
    ) {
      setMessage("Veuillez remplir tous les champs");
      return;
    }

    try {
      const emailExists = await fetchSignInMethodsForEmail(auth, email);
      if (emailExists.length > 0) {
        setMessage("L'adresse e-mail existe déjà");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      await saveUsername(username);

      router.push("../auth/login");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/signup1.png")}
      />
      <Text style={styles.title}>Create an account</Text>
      <InputField
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <InputField
        placeholder="Confirm Password"
        value={confirmationPassword}
        onChangeText={setConfirmationPassword}
        secureTextEntry
      />
      <TermsAndConditions />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("../auth/login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
      <ErrorMessage message={message} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 50,
    transform: [{ scale: 1 }],
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#2E7D32",
  },
  link: {
    color: "#2E7D32",
    textAlign: "center",
  },
});

export default Signup;
