import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface WelcomeMessageProps {
  username: string;
  onLogout: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  username,
  onLogout,
}) => (
  <View style={styles.container}>
    <Text style={styles.successMessage}>Hello {username}!</Text>
    <TouchableOpacity onPress={onLogout}>
      <Text style={styles.link}>Logout</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successMessage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    color: "#2E7D32",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeMessage;
