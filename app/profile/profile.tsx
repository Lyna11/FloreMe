import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../shared/footer";
import { router } from "expo-router";
import Header from "../shared/header";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DeleteAccount from "../auth/delete";
import Logout from "../auth/logout";
import { Linking } from "react-native"; // Import Linking to handle phone calls
import TermsAndConditions from "../shared/termsAndConditions";

export function Profile() {
  const [email, setemail] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLGVisible, setIsModaLGVisible] = useState(false);
  const [isModalTermVisible, setIsModalTermVisible] = useState(false);

  const getUserEmail = async () => {
    const userString = await AsyncStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return user?.email || null;
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      const useremail = await getUserEmail();
      setemail(useremail);
    };

    fetchUserEmail();
  }, []);

  const handleContactUsPress = () => {
    const phoneNumber = "0556990010";
    Linking.openURL(`tel:${phoneNumber}`); // Open the phone dialer with the given number
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" onIconPress={() => router.replace("/map/map")} />
      <Image
        source={require("../../assets/images/profile2.png")}
        style={styles.imagePlant}
      />
      <Image
        source={require("../../assets/images/profile.jpg")}
        style={styles.image}
      />
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity
        onPress={() => setIsModaLGVisible(true)}
        style={styles.button}
      >
        <Text style={styles.text}>Logout</Text>
        <Ionicons name="log-out-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.button}
      >
        <Text style={styles.text}>Delete account</Text>
        <Ionicons name="trash-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.privacy}>
        <Ionicons name="shield-checkmark-outline" size={20}></Ionicons>
        <TouchableOpacity onPress={() => setIsModalTermVisible(true)}>
          <Text style={styles.term}>Terms & Conditions, privacy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contact}>
        <Ionicons name="call-outline" size={20}></Ionicons>
        <TouchableOpacity onPress={handleContactUsPress}>
          <Text style={styles.term}>Contact Us</Text>
        </TouchableOpacity>
      </View>
      <DeleteAccount
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <Logout
        visible={isModalLGVisible}
        onClose={() => setIsModaLGVisible(false)}
      />
      <TermsAndConditions
        visible={isModalTermVisible}
        onClose={() => setIsModalTermVisible(false)}
      />
      <Footer
        onHomePress={() => router.replace("/pernual_api/searchPlant")}
        onFavoritePress={() => router.replace("/favoris/plantfavoris")}
        onCartPress={() => router.replace("/plantid_api/imagePickerComponent")}
        onProfilePress={() => router.replace("/profile/profile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    marginBottom: 10,
    alignSelf: "center",
    transform: [{ scale: 2 }],
    marginTop: -30,
  },
  imagePlant: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    transform: [{ scale: 3 }],
    marginLeft: 80,
    marginTop: 65,
  },
  email: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginTop: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "whithe",
    borderRadius: 8,
    marginTop: 40,
    justifyContent: "space-between",
    borderWidth: 1,
    width: 250,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  term: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginLeft: 5,
    marginTop: 3,
  },
  privacy: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 80,
    padding: 10,
    justifyContent: "center",
  },
  contact: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: -5,
    padding: 10,
    justifyContent: "center",
  },
  imageplantbas: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    transform: [{ scale: 5 }],
    marginLeft: 150,
    marginTop: 120,
  },
});

export default Profile;
