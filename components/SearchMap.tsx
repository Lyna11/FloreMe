import React, { useState, useEffect } from 'react';
import { RelativePathString, useRouter } from 'expo-router';
import { TextInput, FlatList, Text, TouchableOpacity, View } from 'react-native';

interface Plant {
  id: number;
  common_name: string;
}

const SearchMap = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Plant[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://perenual.com/api/species-list?key=sk-k55167472cc3dd9697803&q=${query}`)
        .then(response => response.json())
        .then(data => {
          setSuggestions(data.data);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des suggestions :", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelectPlant = (plantId: number) => {
    // Rediriger vers le composant HardinessMap avec l'ID de la plante
    router.push(`/map/map/${plantId}` as RelativePathString);
    //router.push(`../../map/map/${plantId}`);
    
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
        placeholder="Rechercher une plante..."
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectPlant(item.id)}>
              <Text style={{ padding: 8 }}>{item.common_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchMap;
