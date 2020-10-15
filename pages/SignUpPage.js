import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const SignUpPage = () => {
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
        <View style={{padding:40}}>
            <Title>Create an Account!</Title>
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
                mode="contained" 
                onPress={onPressSignUp}
                style={{marginTop:10}}>
                Register
            </Button>
            <Button onPress={() => navigation.navigate("Login")}>Log In</Button>
        </View>
    );
}

export default SignUpPage;