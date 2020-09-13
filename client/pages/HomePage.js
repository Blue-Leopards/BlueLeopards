import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';

const styles = { 
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
};

const HomePage = () => {
    return (
        <>
            <View style={{
                flex:6,
                //justifyContent: 'center',
                //alignItems: 'center'
            }}>
                <View style={{
                    flex:1, 
                    backgroundColor:'powderblue', 
                    alignItems: 'center',
                    justifyContent: 'center'}}>
                        <Text style={{fontSize: 50}}>Bowfolios!</Text>
                </View>

                <View style={{
                    flex: 4,
                    alignItems: 'center',
                    justifyContent: 'center'}}>
                    <Text style={{fontSize: 25}}>Make a profile.</Text>
                    <Text style={{fontSize: 25}}>Add your projects!</Text>
                    <Text style={{fontSize: 25}}>And connect to people and projects with shared interests!</Text>
               </View>
            </View>
        </>
    );
}

export default HomePage;