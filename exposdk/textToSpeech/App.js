import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as Speech from "expo-speech";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

export default function App() {
  const [text, setText] = useState("Hello");
  const [selected, setSelected] = useState(0);

  const langOptions = [
    { label: "English", language: "en-US" },
    { label: "Finnish", language: "fi-FI" },
    { label: "Swedish", language: "sv-SE" },
  ];

  const values = langOptions.map((option) => option.label);

  const speak = () => {
    Speech.speak(text, { language: langOptions[selected].language });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text to Speech</Text>
      <SegmentedControl
        values={values}
        selectedIndex={selected}
        onChange={(event) =>
          setSelected(event.nativeEvent.selectedSegmentIndex)
        }
        style={styles.segmentedControl}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder="Type text here"
      />
      <Button title="Text-to-speech" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  segmentedControl: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
