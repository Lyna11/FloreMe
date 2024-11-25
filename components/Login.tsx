import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const Login: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Section avec l'image et la courbe */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/imageLogin.png')} 
          style={styles.image}
        />
      </View>

      {/* Contenu principal */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Welcome <Text style={styles.highlight}>Plants</Text>
        </Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        {/* Options supplémentaires */}
        <View style={styles.options}>
          <Text style={styles.rememberMe}>Remember me</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Bouton de connexion */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Lien d'inscription */}
        <TouchableOpacity>
          <Text style={styles.link}>
            Don't have an account? <Text style={styles.linkHighlight}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 250, // Hauteur ajustée pour contenir l'image
    overflow: 'hidden', // Masque les parties dépassantes
    position: 'relative',
  },
  image: {
    width: 500,
    height: 625,
    resizeMode: 'cover',
    position: 'absolute',
    top: -100, // Positionnement vertical de l'image
    left: -50, // Ajuste horizontalement pour centrer
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2E7D32',
  },
  highlight: {
    color: '#388E3C',
    fontFamily: 'serif', // Style pour correspondre au texte personnalisé
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#333',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMe: {
    color: '#2E7D32',
    fontSize: 14,
  },
  forgotPassword: {
    color: '#2E7D32',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    color: '#666',
  },
  linkHighlight: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
});

export default Login;
