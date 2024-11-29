import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const TermsAndConditions = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Terms and Conditions</Text>
            <Text style={styles.text}>
              **1. Introduction**{"\n"}
              Welcome to PlantID! Thank you for using our plant detection app.
              By using our app, you agree to the following terms and conditions.
              If you do not agree with these terms, please do not use the app.
            </Text>
            <Text style={styles.text}>
              **2. Use of the App**{"\n"}
              You agree to use the app only for lawful purposes and in
              accordance with these terms and conditions. You must not use the
              app in any way that could harm or disrupt the experience of other
              users.
            </Text>
            <Text style={styles.text}>
              **3. User Account**{"\n"}
              To access certain features of the app, such as managing your
              favorite plants, you will need to create a user account. You are
              responsible for the security of your login information and all
              activities that occur on your account.
            </Text>
            <Text style={styles.text}>
              **4. Collection of Personal Data**{"\n"}
              When using the app, we collect personal data such as your email
              address, usage preferences, and the plants you identify or save.
              This information is used to improve your experience and provide
              personalized services. For more information, please refer to our
              Privacy Policy.
            </Text>
            <Text style={styles.text}>
              **5. App Features**{"\n"}
              The app allows you to detect plants from photos and search for
              information on plants using the Plant.id API and the Perenual API.
              The app also provides the option to save your favorite plants and
              manage your profile.
            </Text>
            <Text style={styles.text}>
              **6. Intellectual Property**{"\n"}
              All intellectual property rights related to the app, including the
              source code, graphics, images, logos, and content, are the
              exclusive property of GreenTech Inc. and are protected by
              copyright laws. You are not permitted to copy, distribute, or
              modify the app's content without express permission.
            </Text>
            <Text style={styles.text}>
              **7. Use of Data**{"\n"}
              Data collected through the app, such as uploaded plant photos, may
              be used to improve detection algorithms and provide personalized
              services. However, we will never share your personal data with
              third parties without your explicit consent, unless required by
              law.
            </Text>
            <Text style={styles.text}>
              **8. Limitation of Liability**{"\n"}
              In no event will PlantID be liable for any direct, indirect, or
              consequential damages arising from the use of the app, including
              but not limited to the loss of data or information.
            </Text>
            <Text style={styles.text}>
              **9. Modifications of Terms**{"\n"}
              We reserve the right to modify or update these terms and
              conditions at any time. Any changes will be posted here and will
              take effect immediately upon publication. It is your
              responsibility to check this section regularly to stay updated.
            </Text>
            <Text style={styles.text}>
              **10. Termination**{"\n"}
              We reserve the right to suspend or terminate your access to the
              app if you violate these terms. If your account is terminated, you
              must immediately cease using the app.
            </Text>
            <Text style={styles.text}>
              **11. Governing Law**{"\n"}
              These terms and conditions are governed by the laws of the United
              States. In the event of a dispute, the courts of New York City
              will have jurisdiction.
            </Text>
            <Text style={styles.text}>
              **12. Contact**{"\n"}
              If you have any questions or concerns regarding these terms and
              conditions, please contact us at support@plantid.com.
            </Text>
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
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
  modalContainer: {
    width: "80%",
    height: "70%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  scrollView: {
    maxHeight: 800,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#757575",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default TermsAndConditions;
