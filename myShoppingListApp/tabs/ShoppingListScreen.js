import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const database = getDatabase();

const ShoppingListScreen = () => {
  const [product, setProduct] = useState({
    title: "",
    amount: "",
  });
  const [items, setItems] = useState([]);
  const user = getAuth().currentUser;

  // Haetaan käyttäjän tuotteet listasta
  useEffect(() => {
    if (user) {
      const itemsRef = ref(database, `users/${user.uid}/items`);
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const itemsWithKeys = Object.keys(data).map((key) => ({
            key,
            ...data[key],
          }));
          setItems(itemsWithKeys);
        }
      });
    }
  }, [user]);

  // Tallennetaan tuotteet käyttäjän listaan
  const saveItem = () => {
    if (user) {
      push(ref(database, `users/${user.uid}/items`), product);
      setProduct({ title: "", amount: "" });
    }
  };

  // Poistetaan tuotteita listasta käyttäjältä
  const removeItem = (item) => {
    if (user) {
      const itemRef = ref(database, `users/${user.uid}/items/${item.key}`);
      remove(itemRef)
        .then(() => {
          setItems((prevItems) =>
            prevItems.filter((existingItem) => existingItem.key !== item.key)
          );
        })
        .catch((error) => {
          console.error("Error removing item:", error);
        });
    }
  };

  const listSeparator = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
        marginLeft: "5%",
      }}
    />
  );

  // Swaippaus funktio tuotteen poistamista varten (Swipe vasemmalle tuo esille trash iconin)
  const renderSwipeableItem = (item) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteSwipe}
          onPress={() => removeItem(item)}
        >
          <Icon name="trash" size={24} color="red" />
        </TouchableOpacity>
      )}
    >
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>
          {item.title}, {item.amount}
        </Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Product"
          style={styles.input}
          onChangeText={(text) => setProduct({ ...product, title: text })}
          value={product.title}
        />
        <TextInput
          placeholder="Amount"
          style={styles.input}
          onChangeText={(text) => setProduct({ ...product, amount: text })}
          value={product.amount}
        />
        <TouchableOpacity style={styles.addButton} onPress={saveItem}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderSwipeableItem(item)}
        data={items}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "indigo",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    width: "100%",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
  deleteSwipe: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
});

export default ShoppingListScreen;