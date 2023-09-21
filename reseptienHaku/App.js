import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Image, TextInput } from "react-native";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`
        );
        const data = await response.json();
        setRecipes(data.meals);
      } catch (error) {
        console.error("Virhe reseptien haussa:", error);
      }
    }

    fetchRecipes();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Syötä raaka-aine"
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.thumbnail}
            />
            <Text>{item.strMeal}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  recipeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
