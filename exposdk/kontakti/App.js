import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === "granted");

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      setContacts(data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {hasPermission ? (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const { name, phoneNumbers } = item;
            return (
              <View style={styles.contactItem}>
                <Text style={styles.contactName}>{name}</Text>
                <Text style={styles.phoneNumber}>
                  {phoneNumbers ? phoneNumbers[0]?.number : "(no phone number)"}
                </Text>
              </View>
            );
          }}
          ListEmptyComponent={
            <Text style={styles.noContactsText}>Get some contacts!</Text>
          }
        />
      ) : (
        <Text style={styles.noPermissionText}>
          No permission to use Contacts
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phoneNumber: {
    fontSize: 14,
    color: "#666",
  },
  noContactsText: {
    fontSize: 18,
    color: "#666",
  },
  noPermissionText: {
    fontSize: 18,
    color: "red",
  },
});
