import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SearchInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchPlants: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery, searchPlants }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher une plante"
        value={query}
        onChangeText={setQuery}
        placeholderTextColor="#aaa"

      />
      <TouchableOpacity style={styles.searchButton} onPress={searchPlants}>
        <Text style={styles.searchButtonText}>Rechercher</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SearchInput;
