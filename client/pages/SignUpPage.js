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

const SignUpPage = () => {
    
    return (
        <View style={{padding:40}}>
            <Title>Create an Account!</Title>
            <MyInput category="Email"/>
            <MyInput category="Password"/>
            <Button
                mode="contained" 
                onPress={()=>console.log("Pressed Register Button!")}
                style={{marginTop:10}}>
                Register
            </Button>
        </View>
    );
}

export default SignUpPage;