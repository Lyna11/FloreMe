import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { initializeApp, getApps, getApp } from "firebase/app";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  initializeAuth,
  fetchSignInMethodsForEmail,
  getAuth,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
// Configuration Firebase (remplacez par vos paramètres Firebase)
//const auth = getAuth();

import { NavigationProp } from "@react-navigation/native";

const Signup: React.FC = () => {
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [emailDejaUtilise, setEmailDejaUtilise] = useState(false);
  const [emailInvalide, setEmailInvalide] = useState(false);
  const [motsDePasseDifferents, setMotsDePasseDifferents] = useState(false);
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const validateEmail = (Email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(Email);
  };
  const checkExistingEmail = (Email: string) => {
    return new Promise((resolve, reject) => {
      fetchSignInMethodsForEmail(auth, Email)
        .then((signInMethods) => {
          if (signInMethods && signInMethods.length > 0) {
            setEmailDejaUtilise(true);
            resolve(true);
          } else {
            setEmailDejaUtilise(false);
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const handleSignup = async () => {
    setEmailInvalide(false);
    setMotsDePasseDifferents(false);
    setMessage("");

    setMotsDePasseDifferents(false);
    if (!validateEmail(Email)) {
      setEmailInvalide(true);
      setMessage("L'e-mail n'est pas valide");
      return;
    }
    if (Password !== confirmationMotDePasse) {
      setMotsDePasseDifferents(true);
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }
    if (
      username.trim() === "" ||
      Email.trim() === "" ||
      Password.trim() === "" ||
      confirmationMotDePasse.trim() === ""
    ) {
      setMessage("Veuillez remplir tous les champs");
      return;
    }
    try {
      const emailExists = await fetchSignInMethodsForEmail(auth, Email);
      if (emailExists.length > 0) {
        setMessage("L'adresse e-mail existe déjà");
        return;
      }

      await createUserWithEmailAndPassword(auth, Email, Password);
      router.push("../auth/Login"); // Naviguer vers la page Login
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/signup1.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create your new account</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={[styles.input]}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Email"
        value={Email}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        style={[styles.input, emailInvalide && styles.inputInvalid]}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Password"
        value={Password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Confirm Password"
        style={[styles.input, motsDePasseDifferents && styles.inputInvalid]}
        secureTextEntry={true}
        value={confirmationMotDePasse}
        onChangeText={setConfirmationMotDePasse}
        placeholderTextColor="#aaa"
      />

      <View style={styles.termsContainer}>
        <Text>By signing up you agree to our </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Terms of Use</Text>
        </TouchableOpacity>
        <Text> and </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("../auth/Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
      {message && (
        <Text
          style={{
            marginTop: 0,
            color: "red",
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      )}
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
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2E7D32",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "#333",
  },
  inputInvalid: {
    borderColor: "red",
  },
  termsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
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
  link: {
    color: "#2E7D32",
    textAlign: "center",
  },
});

export default Signup;
