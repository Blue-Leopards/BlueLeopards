import React from 'react';
import { View, Text, } from 'react-native';
import { Logout } from '../components/Logout';
import { Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../pages/NavigationBar";

const SettingsPage = () => {
    const navigation = useNavigation();

    return (
            <View style={{ flex: 6
            }}>
                <View style={{padding:30}}>
                <Button style={{marginBottom: 5}} mode="contained" onPress={() => navigation.navigate("Account")}>Manage Account</Button>
                <Button style={{marginBottom: 5}} mode="contained" onPress={() => navigation.navigate("AddProject")}>Create Project</Button>
                <Logout/>
                </View>
                <View style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                }}>
                    <NavigationBar/>   
                </View>

            </View>
    );
}

export default SettingsPage;