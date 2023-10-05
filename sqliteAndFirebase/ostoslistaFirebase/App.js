import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
} from "react-native";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDj8VKxFj9kYKng0Gfy12345",
  authDomain: "shoppinglist.firebaseapp.com",
  databaseURL:
    "https://shoppinglistfirebase-e1dc5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglistfirebase-e1dc5",
  storageBucket: "shoppinglist.appspot.com",
  messagingSenderId: "899777512117",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [product, setProduct] = useState({
    title: "",
    amount: "",
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "items/");
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
  }, []);

  const saveItem = () => {
    push(ref(database, "items/"), product);
  };

  const removeItem = (item) => {
    const itemRef = ref(database, `items/${item.key}`);

    remove(itemRef)
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((existingItem) => existingItem.key !== item.key)
        );
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product"
        style={{
          marginTop: 30,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => setProduct({ ...product, title: text })}
        value={product.title}
      />

      <TextInput
        placeholder="Amount"
        style={{
          marginTop: 5,
          marginBottom: 5,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => setProduct({ ...product, amount: text })}
        value={product.amount}
      />
      <Button onPress={saveItem} title="Save" />
      <Text style={{ marginTop: 30, fontSize: 20 }}>Shopping list</Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.title}, {item.amount}
            </Text>
            <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => removeItem(item)}> delete</Text>
          </View>
        )}
        data={items}
        ItemSeparatorComponent={listSeparator}
      />
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
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
