import React from 'react';

import { View, FlatList } from 'react-native';

import {
    Avatar, 
    Text,
    Card, 
    Title, 
    Divider, 
    Subheading, 
    Button } from 'react-native-paper';

import { useAuth } from "../providers/AuthProvider";

const InterestsPage = ({ navigation }) => {
    const { interests } = useAuth();

    return (
        <View style={{flex: 6}}>
            <FlatList
                listKey="interests"
                data={interests}
                renderItem={({item}) => {
                    return (<Interest data={item}/>);
                }}
                keyExtractor={(item) => item._id}
                />
            <Nav navigation={navigation}/>
        </View>
    );
};

const Interest = (props) => {
    const { _id, name } = props.data;

    const profiles = getProfiles(_id);
    let projects = getProjects(_id);

    return (
        <Card style={{ margin: 10, padding: 10 }}>
            <Title>{name}</Title>
            <Divider style={{ margin: 10 }} />
            <Card.Content style={{marginTop: 10, flex:1, flexDirection:'row'}}>
                <FlatList
                    style={{ flex: 1, flexDirection: 'row' }}
                    listKey={`profiles:${_id}`}
                    data={profiles}
                    renderItem={({ item, index }) => {
                        // <Text key={item.id}>{reduceToInitials(item.name)}</Text>
                        return <Avatar.Text style={{ flex: 1, marginRight: 15 }} size={50} key={item.id} label={reduceToInitials(item.name)} />
                    }}/>
                <View style={{flex: 1}}>
                    <Subheading>Projects</Subheading>
                    <FlatList
                        style={{ flex: 1, flexDirection: 'row' }}
                        listKey={`projects:${_id}`}
                        data={projects}
                        renderItem={({ item, index }) =>
                            <Avatar.Text style={{ flex: 1, backgroundColor: '#51b1a8' }} size={50} key={item.id} label={reduceToInitials(item.name)} />} />
                </View>
            </Card.Content>
        </Card>
    );
}

const reduceToInitials = (name) => {
    let initials = "";
    let names = name.split(" ");
    if(names.length > 0) {
        names.forEach(name => {
            initials += name[0];
        })
    }
    return initials;
};

const getProfiles = (interestId) => {
    const { profileInterest } = useAuth();

    let profileIds = [];
    let profileObjects = [];

    // First get all profile Ids
    profileInterest
        .filter(item => item.interestId === interestId)
        .forEach(item => {
            profileIds.push(item.profileId)
        });
    // Loop through profiles collection and get all names
    profileIds
        .forEach(id => {
            const profile = getProfileData(id);
            profileObjects.push({
                name: profile.name,
                id: `${interestId}${profile.id}`
            });
        });

    return profileObjects;
};

const getProfileData = (profileId) => {
    const { profiles } = useAuth();
    const profile = profiles.filter(item => item._id === profileId);
    let name;
    if (profile.length === 1) {
        name = profile[0].firstName + " " + profile[0].lastName;
    }
    return { name, id: `${profile[0]._id}`};
};

const getProjects = (interestId) => {
    const { projectInterest } = useAuth();
    let projects = [];
    projectInterest
        .filter(item => {
            return item.interestId === interestId;
        })
        .forEach(item => {
            projects.push({name: item.projectName, id: `${item.interestId}${item.projectId}`});
        });
    return projects;
};

const Nav = ({ navigation }) =>
    <View style={{
        height: 75,
        backgroundColor: 'lightgrey',
        flexDirection: 'row'
    }}>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Button onPress={() => navigation.navigate('Profiles')}>Profiles</Button>
        </View>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Button onPress={() => navigation.navigate('Projects')}>Projects</Button>
        </View>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Button onPress={() => navigation.navigate('Interests')}>Interests</Button>
        </View>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Button onPress={() => navigation.navigate('Settings')}>Settings</Button>
        </View>
    </View>;

export default InterestsPage;