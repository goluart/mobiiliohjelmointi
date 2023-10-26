import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { Header, Icon, Input, Button } from "@rneui/themed";

export default function App() {
  const [product, setProduct] = useState({
    title: "",
    amount: "",
  });
  const [shoppingList, setShoppingList] = useState([]);

  const addProduct = () => {
    if (product.title.trim() !== "") {
      setShoppingList([...shoppingList, { key: product }]);
      setProduct({ title: "", amount: "" });
    }
  };

  const removeItem = (itemKey) => {
    const updatedList = shoppingList.filter((item) => item.key !== itemKey);
    setShoppingList(updatedList);
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "SHOPPING LIST",
          style: { color: "#fff", width: "100%" },
        }}
      />
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="Product"
          label="PRODUCT"
          onChangeText={(text) => setProduct({ ...product, title: text })}
          value={product.title}
        />
        <Input
          style={styles.input}
          placeholder="Amount"
          label="AMOUNT"
          onChangeText={(text) => setProduct({ ...product, amount: text })}
          value={product.amount}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button raised icon={{ name: 'save' }} onPress={addProduct} title="SAVE" />
      </View>
      <FlatList
        data={shoppingList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.deleteIcon}>
              <Text>{item.key.title}</Text>
              <Text style={styles.amountText}>{item.key.amount}</Text>
            </View>
            <Icon
              type="material"
              color="red"
              name="delete"
              onPress={() => removeItem(item.key)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    padding: 10,
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  deleteIcon: {
    flex: 1,
  },
  input: {
    padding: 10,
  },
  amountText: {
    color: 'rgba(0, 0, 0, 0.3)',
  }
});
