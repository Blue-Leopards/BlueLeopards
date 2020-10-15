import * as React from "react";
import {  Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../providers/AuthProvider";

export function Logout() {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  return (
    <Button
      mode="contained"
      color="#69604d"
      onPress={() => {
        Alert.alert("Log Out", null, [
          {
            text: "Yes, Log Out",
            style: "destructive",
            onPress: () => {
              signOut();
              navigation.popToTop();
            },
          },
          { text: "Cancel", style: "cancel" },
        ]);
      }}
    >Log Out</Button>
  );
}
