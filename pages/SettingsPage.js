import React from 'react';
import { View, Text, } from 'react-native';
import { Logout } from '../components/Logout';
import { Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import NavigationBar from "../pages/NavigationBar";

const SettingsPage = () => {
    const navigation = useNavigation();

    return (
            <View style={{ flex: 6,
            }}>
                <View style={{padding:30, height:'75%', justifyContent:'center'}}>
                    <Button color="#284e57" style={{marginBottom: 5}} mode="contained" onPress={() => navigation.navigate("Account")}>Manage Account</Button>
                    <Button color="#8bb9b9" style={{marginBottom: 5}} mode="contained" onPress={() => navigation.navigate("Filter")}>Search</Button>
                    <Button color="#bfd6d3" style={{marginBottom: 5}} mode="contained" onPress={() => navigation.navigate("AddProject")}>Create Project</Button>
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