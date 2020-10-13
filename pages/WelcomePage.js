import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../providers/AuthProvider";

export function WelcomeView({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp, signIn } = useAuth();

  useEffect(() => {
    // If there is a user logged in, go to the Profiles page.
    if (user != null) {
      navigation.navigate("Profiles");
    }
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressSignIn = async () => {
    console.log("Press sign in");
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  const onPressSignUp = async () => {
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <View>
      <Text>Signup or Signin, pussy:</Text>
      <View style={{ padding: 5 }}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email"
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 10,
            borderRadius: 2,
          }}
          autoCapitalize="none"
        />
      </View>
      <View style={{ padding: 5}}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="password"
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 10,
            borderRadius: 2,
          }}
          secureTextEntry
        />
      </View>
      <Button onPress={onPressSignIn} title="Sign In" />
      <Button onPress={onPressSignUp} title="Sign Up" />
    </View>
  );
}
