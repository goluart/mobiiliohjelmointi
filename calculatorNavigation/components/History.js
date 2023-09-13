import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function History({ route }) {
  const { historyData } = route.params;
  const navigation = useNavigation();

  return (
    <View>
      <Text>This is History Screen</Text>
      <StatusBar style="auto" />
      {historyData.length > 0 && (
        <Text style={styles.historyHeader}>History</Text>
      )}
      <FlatList
        data={historyData}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        onPress={() => navigation.navigate("Calculator", { user: "Mike" })}
        title="Calculator"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  historyHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
