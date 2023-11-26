import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import UserRegistration from "./UserRegistration";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import firebaseConfig from "./firebaseConfig";

// Authentication navigator (Login/Register)

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "blue",
      },
      headerTintColor: 'white'
    }}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Log in or Register" }}
      />
      <AuthStack.Screen
        name="UserRegistration"
        component={UserRegistration}
        options={{ title: "User Registration" }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
