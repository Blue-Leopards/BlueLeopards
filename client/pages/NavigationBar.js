import React, { View } from 'react';
import { Button, Text } from 'react-native-paper';

const NavigationBar = () =>
  <View style={{
    height: 75,
    backgroundColor: 'lightgrey',
    flexDirection: 'row'
  }}>
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button onPress={() => navigation.navigate('Profiles')}>Profiles</Button>
    </View>
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button onPress={() => navigation.navigate('Projects')}>Projects</Button>
    </View>
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button onPress={() => navigation.navigate('Interests')}>Interests</Button>
    </View>
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button>Settings</Button>
    </View>
  </View>;

export default NavigationBar;