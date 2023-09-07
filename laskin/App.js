import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  TextInput,
  Image,
  FlatList,
} from "react-native";

export default function App() {
  const [result, setResult] = useState("");
  const [tokaNumero, setTokaNumero] = useState("");
  const [ekaNumero, setEkaNumero] = useState("");
  const [data, setData] = useState([]);

  const addPressed = () => {
    const plus = parseFloat(ekaNumero) + parseFloat(tokaNumero);
    const calculation = `${ekaNumero} + ${tokaNumero} = ${plus}`;
    setResult(`Result: ${plus}`);
    setData([...data, { key: calculation }]);
  };

  const subtractPressed = () => {
    const minus = parseFloat(ekaNumero) - parseFloat(tokaNumero);
    const calculation = `${ekaNumero} - ${tokaNumero} = ${minus}`;
    setResult(`Result: ${minus}`);
    setData([...data, { key: calculation }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(ekaNumero) => setEkaNumero(ekaNumero)}
        value={ekaNumero}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(tokaNumero) => setTokaNumero(tokaNumero)}
        value={tokaNumero}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={addPressed} title="+" />
        <View style={styles.buttonGap} />
        <Button onPress={subtractPressed} title="-" />
      </View>
      <StatusBar style="auto" />
      {data.length > 0 && <Text style={styles.historyHeader}>History</Text>}
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  image: {
    width: 250,
    height: 100,
  },
  input: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonGap: {
    width: 16,
  },
});
