import { Text, View, StyleSheet } from "react-native";
import Footer from "../shared/footer";
import { router } from "expo-router";
import Header from "../shared/header";

export function Profile() {
  return (
    <View style={styles.container}>
      <Header title="Profile" onIconPress={() => router.replace("/map/map")} />
      <Text>Profile</Text>
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
});
export default Profile;
