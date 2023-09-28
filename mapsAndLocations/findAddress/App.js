import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);

  /*const [location, setLocation] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    // oletusarvot ratapihantie
  });*/

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("No permission to get location");
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    })();
  }, []);

  const handleSearch = async () => {
    try {
      console.log("Searching for location/Etsitään sijainti: ", searchQuery);

      const response = await fetch(
        `https://www.mapquestapi.com/geocoding/v1/address?key=8HWusrT4Umq9mQnVEfBJjIA5e81sidB1&location=${searchQuery}`
      );

      console.log("API request made");

      if (response.ok) {
        const data = await response.json();
        const coordinates = data.results[0].locations[0].latLng;

        setLocation({
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        });
      } else {
        console.error("Error searching for location");
      }
    } catch (error) {
      console.error("Error searching for location:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location ? location.latitude : 0,
          longitude: location ? location.longitude : 0,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        {location && (  // { location && } Marker renderöi jos location ei ole 'null'
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Searched Location"
          />
        )}
      </MapView>
      <TextInput
        placeholder="Enter a location"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
});
