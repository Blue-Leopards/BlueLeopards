import React from 'react';
import { View, Text, } from 'react-native';
import Logout from '../components/Logout';

const styles = { 
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
};

const SettingsPage = () => {
    return (
            <View style={{
                padding: 20
            }}>
                <Logout/>
            </View>
    );
}

export default SettingsPage;