import React from 'react';
import { View, Text, } from 'react-native';
import { Logout } from '../components/Logout';
import { Button } from 'react-native-paper';

import { useNavigation } from "@react-navigation/native";

const styles = { 
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
};

const SettingsPage = () => {
    const navigation = useNavigation();

    return (
            <View style={{
                padding: 20
            }}>
                <Button mode="contained" onPress={() => navigation.navigate("AddProject")}>Create Project</Button>
                <Logout/>
            </View>
    );
}

export default SettingsPage;