import React from "react";
import { Text, StyleSheet } from "react-native";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) =>
  message ? <Text style={styles.errorText}>{message}</Text> : null;

const styles = StyleSheet.create({
  errorText: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
});

export default ErrorMessage;
