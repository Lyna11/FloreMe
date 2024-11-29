import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import SearchPlant from "../pernual_api/searchPlant";
import LoginForm from "../../components/LoginForm";
import { FirebaseError } from "firebase/app"; // Import FirebaseError

interface User {
  email: string;
}

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
      setErrorMessage("Error checking session: " + (error as Error).message);
      console.error("Error checking session:", error);
    }
  };

  const saveSession = async (user: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setErrorMessage("Error saving session: " + (error as Error).message);
      console.error("Error saving session:", error);
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user.email) {
          setErrorMessage("Login failed: Email is null.");
          return;
        }
        setUsername(email.split("@")[0]);
        setIsLoggedIn(true);
        saveSession({ email: user.email });
        setErrorMessage(""); // Clear error message on successful login
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case "auth/invalid-email":
            setErrorMessage("Invalid email address format.");
            break;
          case "auth/invalid-credential":
            setErrorMessage("email or password Incorrect .");
            break;
          case "auth/network-request-failed":
            setErrorMessage("Network error, please try again later.");
            break;
          default:
            setErrorMessage("Login failed: " + errorMessage);
            break;
        }
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
    justifyContent: "center",
  },
});

export default Login;
