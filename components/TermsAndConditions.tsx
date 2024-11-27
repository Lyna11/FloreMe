import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TermsAndConditions: React.FC = () => (
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
);

const styles = StyleSheet.create({
  termsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "center",
  },
  link: {
    color: "#2E7D32",
    textAlign: "center",
  },
});

export default TermsAndConditions;
