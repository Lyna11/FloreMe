import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { initializeApp, getApps } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const savedEmail = JSON.parse(user).email;
      }
    } catch (error) {
      console.log("Error checking session:", error);
    }
  };

  const saveSession = async (user: any) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("Session saved successfully");
    } catch (error) {
      console.log("Error saving session:", error);
    }
  };

  const clearSession = async () => {
    try {
      await AsyncStorage.removeItem("user");
      console.log("Session cleared successfully");
    } catch (error) {
      console.log("Error clearing session:", error);
    }
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const emailParts = email.split("@");
        const username = emailParts[0];
        setUsername(username);
        setIsLoggedIn(true);
        saveSession(user);
        setErrorMessage(""); // Réinitialise les messages d'erreur
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = "";
        if (errorCode === "auth/invalid-email") {
          errorMessage = "Adresse e-mail invalide.";
        } else if (errorCode === "auth/wrong-password") {
          errorMessage = "Mot de passe incorrect.";
        } else if (errorCode === "auth/user-not-found") {
          errorMessage = "L'utilisateur n'existe pas.";
        } else {
          errorMessage = "Erreur lors de la connexion.";
        }
        setErrorMessage(errorMessage);
        setIsLoggedIn(false); // Empêche l'affichage de "Hello" en cas d'erreur
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        saveSession(user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View>
          <Text style={styles.successMessage}>Hello {username}!</Text>
          <TouchableOpacity onPress={() => router.push("../auth/Logout")}>
            <Text style={styles.link}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Section avec l'image et la courbe */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/imageLogin.png")}
              style={styles.image}
            />
          </View>

          {/* Contenu principal */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>
              Welcome <Text style={styles.highlight}>Plants</Text>
            </Text>
            <Text style={styles.subtitle}>Login to your account</Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#aaa"
            />

            {/* Options supplémentaires */}
            <View style={styles.options}>
              <Text style={styles.rememberMe}>Remember me</Text>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Bouton de connexion */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Lien d'inscription */}
            <TouchableOpacity onPress={() => router.push("../auth/Signup")}>
              <Text style={styles.link}>
                Don't have an account?{" "}
                <Text style={styles.linkHighlight}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    height: 250, // Hauteur ajustée pour contenir l'image
    overflow: "hidden", // Masque les parties dépassantes
    position: "relative",
  },
  image: {
    width: 500,
    height: 625,
    resizeMode: "cover",
    position: "absolute",
    top: -100, // Positionnement vertical de l'image
    left: -50, // Ajuste horizontalement pour centrer
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2E7D32",
  },
  highlight: {
    color: "#388E3C",
    fontFamily: "serif", // Style pour correspondre au texte personnalisé
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "#333",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMe: {
    color: "#2E7D32",
    fontSize: 14,
  },
  forgotPassword: {
    color: "#2E7D32",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    color: "#666",
  },
  linkHighlight: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginTop: -100,
  },
  successMessage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginTop: 50,
  },
});

export default Login;
