import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
} from "react-native";

export default function App() {
  const [item, setItem] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = () => {
    if (item.trim() !== "") {
      setShoppingList([...shoppingList, { key: item }]);
      setItem("");
    }
  };

  const clearList = () => {
    setShoppingList([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setItem(text)}
          value={item}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={addItem} />
        <Button title="Clear" onPress={clearList} />
      </View>
      <FlatList
        data={shoppingList}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  item: {
    fontSize: 18,
    marginBottom: 5,
  },
});
