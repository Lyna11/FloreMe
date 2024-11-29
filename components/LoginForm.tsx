import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  onLogin: () => void;
  errorMessage: string;
  navigateToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  errorMessage,
  navigateToSignup,
}) => (
  <View style={styles.formContainer}>
    <Image
      style={styles.image}
      source={require("../assets/images/imageLogin.png")}
    />
    <Text style={styles.title}>
      Welcome <Text style={styles.highlight}>back</Text>
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
    <View style={styles.options}>
      <Text style={styles.rememberMe}>Remember me</Text>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.button} onPress={onLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={navigateToSignup}>
      <Text style={styles.link}>
        Don't have an account? <Text style={styles.linkHighlight}>Sign up</Text>
      </Text>
    </TouchableOpacity>
    {errorMessage ? (
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#2E7D32",
    transform: [{ scale: 2.5 }],
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
    fontFamily: "serif",
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
    marginTop: 10,
  },
});

export default LoginForm;
