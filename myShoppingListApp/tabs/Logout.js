import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { signOut } from "firebase/auth";

// Logout komponentti käyttäjän uloskirjoutumista varten
const Logout = ({ navigation, auth }) => {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout successful!");
      Alert.alert("Logout Successful", "You have been successfully logged out.");
      navigation.navigate("AuthNavigator");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to log out?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Logout;
