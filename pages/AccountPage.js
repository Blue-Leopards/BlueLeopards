import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";


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
    const { user, updateUser, profiles } = useAuth();
    const navigation = useNavigation();

    // Find User's Profile
    const userProfile = profiles.filter(profile => {
        return profile._id === user.customData._id;
    })[0];

    const {_id, email, firstName, lastName, bio, title, picture} = userProfile;
    
    const [ userData, setUserData ] = useState({
        _id, email, firstName, lastName, bio, title, picture
    });


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
                onPress={()=> {
                    updateUser({
                    "_id": userData._id,
                    "email":userData.email,
                    "firstName":userData.firstName,
                    "lastName": userData.lastName,
                    "bio": userData.bio,
                    "title": userData.title,
                    "picture": userData.picture
                    });
                    navigation.navigate("Profiles");
                }}
                style={{marginTop:10}}>
                Update
            </Button>
        </View>
    );
}

export default AccountPage;