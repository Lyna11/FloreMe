import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import SearchPlant from "../pernual_api/searchPlant";
import LoginForm from "../../components/LoginForm";
import WelcomeMessage from "../../components/WelcomeMessage";
 
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
        const parsedUser = JSON.parse(user);
        setUsername(parsedUser.email.split("@")[0]);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };
 
  const saveSession = async (user: any) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };
 
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUsername(email.split("@")[0]);
        setIsLoggedIn(true);
        saveSession(user);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Login failed: " + error.message);
      });
  };
 
  const handleLogout = async () => {
    router.replace("../auth/logout");
  };
 
  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <SearchPlant />
      ) : (
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onLogin={handleLogin}
          errorMessage={errorMessage}
          navigateToSignup={() => router.push("/auth/signup")}
        />
      )}
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //centrer le contenu
    justifyContent: "center",
  },
});
 
export default Login;