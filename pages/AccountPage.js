import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { TextInput, Button, Title, Text, Subheading } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";

import { Modal, Portal, Provider } from 'react-native-paper';

const AccountPage = () => {
    const { user, updateUser, profiles, interests, profileInterest, profileProject, addProfileInterest } = useAuth();
    const navigation = useNavigation();

    const [interestVisible, setInterestVisible] = React.useState(false);
    const [projectVisible, setProjectVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

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

    // Find interests that user does not have
    const nonInterests = getNonInterests(interests, userInterests);

    // Find User's updated Account Data
    const {_id, email, firstName, lastName, bio, title, picture} = userProfile;
    
    // Set up hook to control components
    const [ userData, setUserData ] = useState({
        _id, email, firstName, lastName, bio, title, picture
    });


    return (
        <View style={{ flex: 1, padding: 10 }}>
            <TextInput
                label="Email"
                value={userData.email}
                onChangeText={text => setUserData({...userData, email: text})}
                />
            <TextInput
                label="First Name"
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
            { interestVisible || projectVisible
                ? null
                :
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
            }

            <View style={{
                flexDirection: 'row',
                borderWidth:1,
                marginTop:10,
            }}>
                <Button labelStyle={{color:"white"}} color="#51b1a8" mode="contained" compact={true} style={{flex:1}} onPress={() => setInterestVisible(true)}>
                    Add Interest
                </Button>
                <Button labelStyle={{color:"white"}} color="#51b1a8" mode="contained" compact={true} style={{flex:1}} onPress={()=> setProjectVisible(true)}>
                    Add Project
                </Button>
            </View>

            <View style={{
                flexDirection: 'row',
            }}>
            <Interests title="Interests" data={userInterests} id={_id} />
            <Projects title="Projects" data={userProjects} id={_id} />
            </View>
            <Provider>
                <Portal>
                    <Modal visible={interestVisible} onDismiss={() => setInterestVisible(false)}>
                        <View style={{backgroundColor: 'white', height:'80%', width:'100%'}}>
                        <Subheading>Add Interests!</Subheading>
                        <FlatList
                            listKey={`nonInterests:${_id}`}
                            data={nonInterests}
                            renderItem={({ item }) => {
                            return (
                                    <Button key={item._id} onPress={() => {
                                        console.log(`Adding Interest: ${item.name} To: ${user.customData.email}`);
                                        addProfileInterest({
                                            profileId: _id,
                                            profileEmail: email,
                                            interestId: item._id,
                                            interestName: item.name
                                        })
                                    }}>{item.name}</Button>
                            );}}
                            keyExtractor={(item) => item._id}
                         />
                        </View>
                    </Modal>
                    <Modal visible={projectVisible} onDismiss={() => setProjectVisible(false)}>
                        <View style={{backgroundColor: 'white', height:'80%', width:'100%'}}>
                        <Text>Projects Modal</Text>  
                        </View>
                    </Modal>
                </Portal>
            </Provider>
        </View>
    );
};

// Given the interest collection and a user's interests, return the interests
// that user does not have.
const getNonInterests = (interestCollection, userInterests) => {
    let nonInterests;
    let interestIds = [];

    userInterests.forEach(interest => {
        interestIds.push(interest.interestId);
    });

    nonInterests = interestCollection.filter(interest => {
        let isNotInterest = true;
        
        interestIds.forEach(id => {
            if(interest._id === id) {
                isNotInterest = false;
            }
        });
        return isNotInterest;
    });
    return nonInterests;
};

const Interests = ({title, id, data}) => {
    let componentToRender;
    if(data.length === 0) {
        componentToRender = null;
    } else {
        componentToRender = (
            <View style={{ borderWidth: 1, flex:1, height:100 }}>
                <Subheading>{title}</Subheading>
                <FlatList
                    listKey={`interests:${id}`}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View key={item._id} style={{ borderWidth: 1, flex: 1, padding:5 }}>
                                <Text >{item.interestName}</Text>
                            </View>
                        );}}
                    keyExtractor={(item) => item._id}
                />
            </View>
        );
    }
    return (componentToRender);
}
const Projects = ({title, id, data}) => {
    let componentToRender;
    if(data.length === 0) {
        componentToRender = null;
    } else {
        componentToRender = (
            <View style={{borderWidth:1, flex:1, height:100}}>
                <Subheading>{title}</Subheading>
                <FlatList
                    listKey={`projects:${id}`}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View key={item._id} style={{ borderWidth: 1, flex: 1, padding:5 }}>
                                <Text >{item.projectName}</Text>
                            </View>
                        );}}
                    keyExtractor={(item) => item._id}
                    />
            </View>
        );
    }
    return (componentToRender);
}
export default AccountPage;