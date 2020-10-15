import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { TextInput, Button, Text, Subheading, Card, IconButton, Paragraph, Modal, Portal, Provider } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const AccountPage = () => {
    const { user, updateUser, profiles, interests, projects, profileInterest, profileProject, addProfileInterest, addProfileProject } = useAuth();
    const navigation = useNavigation();

    const [interestVisible, setInterestVisible] = React.useState(false);
    const [projectVisible, setProjectVisible] = React.useState(false);

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
    const nonProjects = getNonProjects(projects, userProjects);
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

            <View style={{
                flexDirection: 'row',
            }}>
            <Interests title="Interests" data={userInterests} id={_id} />
            <Projects title="Projects" data={userProjects} id={_id} />
            </View>
            <Provider>
                <Portal>
                    <Modal visible={interestVisible} onDismiss={() => setInterestVisible(false)}>
                    <Card style={{padding:20, marginBottom: 60, marginLeft: 10, marginRight: 10}}>
                            <Card.Title title="Add Interests" />
                            <Card.Content>
                            <FlatList
                                listKey={`nonInterests:${_id}`}
                                data={nonInterests}
                                renderItem={({ item }) => {
                                return (
                                    <View style={{flex:1, flexDirection:'row'}}>
                                    <IconButton size={12} icon="plus-circle" onPress={() => {
                                            console.log(`Adding Interest: ${item.name} To: ${user.customData.email}`);
                                            addProfileInterest({
                                                profileId: _id,
                                                profileEmail: email,
                                                interestId: item._id,
                                                interestName: item.name
                                            })
                                        }}/>
                                    <Paragraph>{item.name}</Paragraph>
                                    </View>

                                );}}
                                keyExtractor={(item) => item._id}
                            />                            
                            </Card.Content>
                            <Card.Actions>
                                <Button color="#284e57" onPress={() => setInterestVisible(false)}>Done</Button>
                            </Card.Actions>
                        </Card>
                    </Modal>
                    <Modal visible={projectVisible} onDismiss={() => setProjectVisible(false)}>
                    <Card style={{padding:20, marginBottom: 60, marginLeft: 10, marginRight: 10}}>
                            <Card.Title title="Add Contributions" />
                            <Card.Content>
                            <FlatList
                                listKey={`addProjects:${_id}`}
                                data={nonProjects}
                                renderItem={({ item }) => {
                                return (
                                    <View style={{flex:1, flexDirection:'row'}}>
                                    <IconButton size={12} icon="plus-circle" onPress={() => {
                                            console.log(`Adding Project: ${item.name} To: ${user.customData.email}`);
                                            addProfileProject({
                                                profileId: _id,
                                                profileEmail: email,
                                                projectId: item._id,
                                                projectName: item.name
                                            });
                                        }}/>
                                    <Paragraph>{item.name}</Paragraph>
                                    </View>

                                );}}
                                keyExtractor={(item) => item._id}
                            />                            
                            </Card.Content>
                            <Card.Actions>
                                <Button color="#284e57" onPress={() => setProjectVisible(false)}>Done</Button>
                            </Card.Actions>
                        </Card>
                    </Modal>
                </Portal>
            </Provider>

            <View style={{ flex: 1, justifyContent: 'flex-end'}}>

            <View style={{ flexDirection: 'row', marginTop:10 }}>
                <Button color="#284e57" compact={true} style={{flex:1}} onPress={() => setInterestVisible(true)}>
                    Add Interest
                </Button>
                <Button color="#284e57" compact={true} style={{flex:1}} onPress={()=> setProjectVisible(true)}>
                    Add Project
                </Button>
            </View>
                <Button
                color="#284e57"
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

// Given the project collection and a user's projects, return the interests
// that user does not have.
const getNonProjects = (projectCollection, userProjects) => {
    let nonProjects;
    let projectsIds = [];

    userProjects.forEach(project => {
        projectsIds.push(project.projectId);
    });

    nonProjects = projectCollection.filter(project => {
        let isNotProject = true;
        
        projectsIds.forEach(id => {
            if(project._id === id) {
                isNotProject = false;
            }
        });
        return isNotProject;
    });
    return nonProjects;
};

const Interests = ({title, id, data}) => {
    let componentToRender;
    if(data.length === 0) {
        componentToRender = null;
    } else {
        componentToRender = (
            <View style={{ flex:1, height:100 }}>
                <Subheading>{title}</Subheading>
                <FlatList
                    listKey={`interests:${id}`}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View key={item._id} style={{ flex: 1, padding:5 }}>
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
            <View style={{ flex:1, height:100}}>
                <Subheading>{title}</Subheading>
                <FlatList
                    listKey={`projects:${id}`}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View key={item._id} style={{ flex: 1, padding:5 }}>
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