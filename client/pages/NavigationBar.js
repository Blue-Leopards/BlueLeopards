import React from 'react';
import {
    View,
    Text
  } from 'react-native';

const NavigationBar = () => {
    return(
        <View style={{
            height: 75, 
            backgroundColor:'grey',
            flexDirection: 'row'}}>
          <View style={{flex: 1,                 
                justifyContent: 'center',
                alignItems: 'center'}}>
              <Text>Profiles</Text>
          </View>
          <View style={{flex: 1,                 
                justifyContent: 'center',
                alignItems: 'center'}}>
              <Text>Projects</Text>
          </View>
          <View style={{flex: 1,                 
                justifyContent: 'center',
                alignItems: 'center'}}>
              <Text>Interests</Text>
          </View>
          <View style={{flex: 1,                 
                justifyContent: 'center',
                alignItems: 'center'}}>
              <Text>Filter</Text>
          </View>
          <View style={{flex: 1,                 
                justifyContent: 'center',
                alignItems: 'center'}}>
              <Text>Account</Text>
          </View>
        </View>
    );

};

  export default NavigationBar;