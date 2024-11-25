import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Signup: React.FC = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image
          source={require('../assets/images/signup1.png')} 
          style={styles.image}
        />
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create your new account</Text>
      <TextInput placeholder="Full Name" style={styles.input} placeholderTextColor="#aaa"/>
      <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} placeholderTextColor="#aaa"/>
      <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#aaa"/>
      <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} placeholderTextColor="#aaa"/>
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2E7D32',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#333',
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    color: '#2E7D32',
    textAlign: 'center',
  },
});

export default Signup;
