import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const AccountPage = () => {
    const { user, updateUser, profiles, profileInterest, profileProject } = useAuth();
    const navigation = useNavigation();

    // Find User's Profile
    const userProfile = profiles.filter(profile => {
        return profile._id === user.customData._id;
    })[0];
    // Find User's Interests
    const userInterests = profileInterest.filter(item => {
        return item.profileId === user.customData._id;
    });
    // Find User's Projects
    const userProjects = profileProject.filter(item => {
        return item.profileId === user.customData._id;
    })
    // Find User's updated Account Data
    const {_id, email, firstName, lastName, bio, title, picture} = userProfile;
    
    // Set up hook to control components
    const [ userData, setUserData ] = useState({
        _id, email, firstName, lastName, bio, title, picture
    });


    return (
        <View style={{padding:30}}>
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
                <Interests title="Interests" data={userInterests} id={_id} />
                <Projects title="Projects" data={userProjects} id={_id} />
                

        </View>
    );
}

const Interests = ({title, id, data}) => {
    let componentToRender;
    console.log(`data length: ${data.length}`);
    if(data.length === 0) {
        componentToRender = null;
    } else {
        componentToRender = (
            <View>
                <Title>{title}</Title>
                <FlatList
                    listKey={`interests:${id}`}
                    data={data}
                    renderItem={({ item }) => <Text key={item._id}>{item.interestName}</Text>} 
                    keyExtractor={(item) => item._id}
                    />
            </View>
        );
    }
    return (componentToRender);
}
const Projects = ({title, id, data}) => {
    let componentToRender;
    console.log(`data length: ${data.length}`);
    if(data.length === 0) {
        componentToRender = null;
    } else {
        componentToRender = (
            <View>
                <Title>{title}</Title>
                <FlatList
                    listKey={`projects:${id}`}
                    data={data}
                    renderItem={({ item }) => <Text key={item._id}>{item.projectName}</Text>} 
                    keyExtractor={(item) => item._id}
                    />
            </View>
        );
    }
    return (componentToRender);
}
export default AccountPage;