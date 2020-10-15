import React from 'react';
import { View } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import {useRoute} from '@react-navigation/native';

const NavigationBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={{
      height: 50,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderTopWidth:1,
      borderColor:'grey'
    }}>
      <IconButton
        style={styles.buttonStyle}
        icon={`account-group${route.name !== "Profiles" ? "-outline" : ""}`}
        size={styles.buttonSize}
        onPress={() => {navigation.navigate('Profiles')}}
      />
      <IconButton
        style={styles.buttonStyle}
        icon={`file-account${route.name !== "Projects" ? "-outline" : ""}`}
        size={styles.buttonSize}
        onPress={() => navigation.navigate('Projects')}
      />
      <IconButton
        style={styles.buttonStyle}
        icon={`lightbulb-on${route.name !== "Interests" ? "-outline" : ""}`}
        size={styles.buttonSize}
        onPress={() => navigation.navigate('Interests')}
      />
      <IconButton
        style={styles.buttonStyle}
        icon={`cog${route.name !== "Settings" ? "-outline" : ""}`}
        size={styles.buttonSize}
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

const styles = {
  buttonStyle: {
    flex:1,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin:0,
  },
  buttonSize: 30,
  highlightedButtonSize:35,
  buttonLabelStyle: {
  }
};
/* 

/*
    <View style={{
      height: 75,
      backgroundColor: 'lightgrey',
      flexDirection: 'row',
      borderWidth:1
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button mode="contained" icon="account-group"  onPress={() => navigation.navigate('Profiles')}></Button>
      </View>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button icon="file-account" onPress={() => navigation.navigate('Projects')}></Button>
      </View>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button icon="lightbulb-on" onPress={() => navigation.navigate('Interests')}></Button>
      </View>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button icon="cog-outline" onPress={() => navigation.navigate('Settings')}></Button>
      </View>
    </View>
*/
export default NavigationBar;