import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";


const MyInput = ({category, value, onChangeHandler}) => {
    const [text, setText ] = useState("");

    return (
        <TextInput
            label={category}
            value={text}
            onChangeText={text => setText(text)}
        />
    );
};

const AccountPage = () => {
    const { user } = useAuth();
    // console.log(Object.getOwnPropertyNames(user.));
    // console.log(user.customData);
    const {_id, email, firstName, lastName, bio, title, picture} = user.customData;
    
    const [ userData, setUserData ] = useState({
        _id, email, firstName, lastName, bio, title, picture
    });
    console.log(userData);
    return (
        <View style={{padding:40}}>
            <Title>Account Settings</Title>
            <TextInput
                label="Email"
                value={userData.email}
                onChangeText={text => setUserData({...userData, email: text})}
                />
            <TextInput
                label="FirstName"
                value={userData.firstName}
                onChangeText={text => setUserData({...userData, firstName: text})}
                />
            <TextInput
                label="Last Name"
                value={userData.lastName}
                onChangeText={text => setUserData({...userData, lastName: text})}
                />
            <TextInput
                label="Title"
                value={userData.title}
                onChangeText={text => setUserData({...userData, title: text})}
                />
            <TextInput
                label="Bio"
                value={userData.bio}
                onChangeText={text => setUserData({...userData, bio: text})}
                />
            <TextInput
                label="Picture URL"
                value={userData.picture}
                onChangeText={text => setUserData({...userData, picture: text})}
                />

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