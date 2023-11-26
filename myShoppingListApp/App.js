import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthNavigator from "./tabs/AuthNavigator";
import ShoppingListScreen from "./tabs/ShoppingListScreen";
import Logout from "./tabs/Logout";

const Drawer = createDrawerNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="blue" style="light" />
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "blue" },
          headerTintColor: "white",
        }}
      >
        {user ? (
          <>
            <Drawer.Screen
              name="ShoppingListScreen"
              component={ShoppingListScreen}
              options={{ title: "Shopping List" }}
            />
            <Drawer.Screen
              name="Logout"
              options={{ title: `Logout - ${user.email}` }}
            >
              {(props) => <Logout {...props} auth={auth} />}
            </Drawer.Screen>
          </>
        ) : (
          <Drawer.Screen
            name="AuthNavigator"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
