import React from 'react';
import {
    View,
  } from 'react-native';
import {
    TextInput, 
    Button,
    Title
} from 'react-native-paper';

const MyInput = (props) => {
    const [text, setText] = React.useState('');

    return (
        <TextInput
            label={props.category}
            value={text}
            onChangeText={text => setText(text)}
        />
    );
};

const LoginPage = () => {
    
    return (
        <View style={{padding:40}}>
            <Title>Log In</Title>
            <MyInput category="Email"/>
            <MyInput category="Password"/>
            <Button
                mode="contained" 
                onPress={()=>console.log("Pressed Login Button!")}
                style={{marginTop:10}}>
                Go
            </Button>
        </View>
    );
}

export default LoginPage;