import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Bibliothèque pour l'icône de la Terre
import { SafeAreaView } from "react-native-safe-area-context";

// Obtenir la largeur de l'écran
const { width: screenWidth } = Dimensions.get("window");

type HeaderProps = {
  title: string;
  onIconPress: () => void;
};

const Header: React.FC<HeaderProps> = ({ title, onIconPress }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={[styles.container, { width: screenWidth }]}>
        {/* Titre de la page à gauche */}
        <Text style={styles.title}>{title}</Text>

        {/* Icône de la Terre à droite */}
        <TouchableOpacity onPress={onIconPress}>
          <Ionicons name="earth" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginLeft: -10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
    flex: 1,
  },
});

export default Header;
