import React, { useEffect, useState } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { TextInput, Button, Title, Chip, Text, Subheading } from 'react-native-paper';
import { Card, Paragraph, IconButton } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";
import { Modal, Portal, Provider } from 'react-native-paper';

const buttonStyle = {
  padding: 0, margin: 0
};
const buttonTextStyle = {
    fontSize:10,
    padding: 0, margin: 0
};

const AddProjectPage = () => {
    const { user, profiles, interests, createProject } = useAuth();
    const { _id } = user.customData;

    // Form Data
    const [name, setName ] = React.useState("");
    const [description, setDescription ] = React.useState("");
    const [homePage, setHomePage ] = React.useState("");
    const [picture, setPicture ] = React.useState("");

    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedProfiles, setSelectedProfiles] = useState([]);
    
    // State for determining whether modal should open or closed
    const [interestVisible, setInterestVisible] = React.useState(false);
    const [profileVisible, setProfileVisible] = React.useState(false);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <TextInput
                label="Project Name"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={text => setDescription(text)}
            />
            <TextInput
                label="Homepage"
                value={homePage}
                onChangeText={text => setHomePage(text)}
            />
            <TextInput
                label="Picture URL"
                value={picture}
                onChangeText={text => setPicture(text)}
            />
            <View style={{marginLeft:10}}>
                { selectedInterests.length > 0 ? <Title>Tags</Title> : null }
                { selectedInterests.map((interest) => {
                    return <Text key={interest._id}>{interest.name}</Text>
                })}
            </View>
            <View style={{marginLeft:10}}>
                { selectedProfiles.length > 0 ? <Title>Contributors</Title> : null }
                { selectedProfiles.map((profile) => {
                    return <Text key={profile._id}>{profile.email}</Text>
                })}
            </View>

            <Provider>
                <Portal>
                    <Modal visible={interestVisible} onDismiss={() => setInterestVisible(false)}>
                        <Card style={{padding:20, marginBottom: 60, marginLeft: 10, marginRight: 10}}>
                            <Card.Title title="Add Tags" />
                            <Card.Content>
                            <FlatList
                                listKey={`addInterests:${_id}`}
                                data={interests}
                                renderItem={({ item }) => {
                                return (
                                    <View style={{flex:1, flexDirection:'row'}}>
                                    <IconButton size={12} icon="plus-circle" onPress={() => {
                                        const currentInterests = selectedInterests.filter((interest) => {
                                            return interest._id === item._id;
                                        });
                                        if(currentInterests.length === 0) {
                                            setSelectedInterests([...selectedInterests, {_id: item._id, name: item.name}]);
                                            console.log(`Adding Interest: ${item.name}`);
                                        }
                                        }}/>
                                    <Paragraph>{item.name}</Paragraph>
                                    </View>

                                );}}
                                keyExtractor={(item) => item._id}
                            />                            
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => setInterestVisible(false)}>Done</Button>
                            </Card.Actions>
                        </Card>
                    </Modal>
                    <Modal visible={profileVisible} onDismiss={() => setProfileVisible(false)}>
                        <Card style={{padding:20, marginBottom: 45, marginLeft: 10, marginRight: 10}}>
                            <Card.Title title="Add Contributors" />
                            <Card.Content>
                            <FlatList
                                listKey={`addProfiles:${_id}`}
                                data={profiles}
                                renderItem={({ item }) => {
                                return (
                                    <View style={{flex:1, flexDirection:'row'}}>
                                    <IconButton size={12} icon="plus-circle" onPress={() => {
                                        const currentProfiles = selectedProfiles.filter((profile) => {
                                            return profile._id === item._id;
                                        });
                                        if(currentProfiles.length === 0) {
                                            setSelectedProfiles([...selectedProfiles, {_id: item._id, email: item.email}]);
                                            console.log(`Adding Contributor: ${item.email}`);
                                            console.log("Selected Users:");
                                            console.log(selectedProfiles);
                                            console.log("Selected Tags:");
                                            console.log(selectedInterests);
                                            }
                                        }}/>
                                    <Paragraph>{item.email}</Paragraph>
                                    </View>

                                );}}
                                keyExtractor={(item) => item._id}
                            />                            
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => setProfileVisible(false)}>Done</Button>
                            </Card.Actions>
                        </Card>
                    </Modal>
                </Portal>
            </Provider>

            <View style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                }}>
                <Button labelStyle={{ color: "white" }} color="#51b1a8" mode="contained" compact={true} onPress={() => setInterestVisible(true)}>
                    Add Interests
                </Button>
                <Button style={{marginTop:10}} labelStyle={{ color: "white" }} color="#51b1a8" mode="contained" compact={true} onPress={() => setProfileVisible(true)}>
                    Add Contributors
                </Button>
                <Button
                    mode="contained" 
                    onPress={() => {createProject({ name, homePage, picture, description}, selectedProfiles, selectedInterests)}}
                    style={{marginTop:10}}>
                    Create
                </Button>
            </View>
        </View>
    );
}

export default AddProjectPage;