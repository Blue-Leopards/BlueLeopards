import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
    const navigation = useNavigation();
    const { user, signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // If there is a user logged in, go to the Profiles page.
        if (user != null) {
            navigation.navigate("Profiles");
        }
    }, [user]);

    // The onPressSignIn method calls AuthProvider.signIn with the
    // email/password in state.
    const onPressSignIn = async () => {
        console.log("Pressed sign in");
        try {
            await signIn(email, password);
        } catch (error) {
            Alert.alert(`Failed to sign in: ${error.message}`);
        }
    };

    return (
        <View style={{padding:40}}>
            <Title>Blue Leopards</Title>
            <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            />
            <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            <Button
                color="#284e57"
                mode="contained" 
                onPress={onPressSignIn}
                style={{marginTop:10}}>
                Log In
            </Button>

            <Button color="#284e57" onPress={() => navigation.navigate("SignUp")}>sign up</Button>
        </View>
    );
}

export default LoginPage;