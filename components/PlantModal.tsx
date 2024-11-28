import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

interface Section {
  type: string;
  description: string;
}

interface PlantCareGuide {
  common_name: string | null;
  scientific_name: string[];
  section: Section[];
}

interface PlantModalProps {
  plant: PlantCareGuide | null;
  visible: boolean;
  onClose: () => void;
}

const renderIcon = (type: string) => {
  switch (type) {
    case "watering":
      return <Ionicons name="water-outline" size={24} color="blue" />;
    case "sunlight":
      return <Ionicons name="sunny" size={24} color="#947100" />;
    case "pruning":
      return <Ionicons name="cut-outline" size={24} color="red" />;
    default:
      return null;
  }
};

const PlantModal: React.FC<PlantModalProps> = ({ plant, visible, onClose }) => {
  if (!plant) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.modalTitle}>{plant.common_name}</Text>
            <Text style={styles.modalSubtitle}>
              {plant.scientific_name.join(", ")}
            </Text>
            {plant?.section.map((sec, index) => (
              <View key={index} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  {renderIcon(sec.type)} {sec.type}
                </Text>
                <Text>{sec.description}</Text>
              </View>
            ))}
          </ScrollView>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "gray",
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PlantModal;
