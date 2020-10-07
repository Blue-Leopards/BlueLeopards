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
            placeholder={props.placeholder}
            value={text}
            onChangeText={text => setText(text)}
        />
    );
};

const AccountPage = () => {

    return (
        <View style={{padding:40}}>
            <Title>Account Settings</Title>
            <MyInput category="First Name"/>
            <MyInput category="Last Name"/>
            <MyInput category="Email"/>
            <MyInput category="Biographical statement"/>

            <MyInput category="Title"/>
            <MyInput category="Picture URL"/>
            <MyInput category="Interests"/>
            <MyInput category="Projects"/>
            <Button
                mode="contained" 
                onPress={()=>console.log("Pressed Update Account Button!")}
                style={{marginTop:10}}>
                Update
            </Button>
        </View>
    );
}

export default AccountPage;