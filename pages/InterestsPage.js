import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, Card, Title, Divider, Button, Chip } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";
import NavigationBar from "../pages/NavigationBar";

const InterestsPage = () => {
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
            <NavigationBar/>
        </View>
    );
};

const Interest = (props) => {
    const { _id, name } = props.data;
    const profiles = getProfiles(_id);
    let projects = getProjects(_id);

    return (
        <Card style={{ margin: 10, padding: 10,  }}>
            <Title>{name}</Title>
            <Divider style={{ margin: 10 }} />
            <Card.Content style={{marginTop: 10, flex:1, flexDirection:'column', }}>
                <FlatList
                    style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignItems:'space-between' }}
                    listKey={`profiles:${_id}`}
                    data={profiles}
                    renderItem={({ item }) => {
                        return <Chip key={item.id} style={{ backgroundColor: '#8bb9b9' }}><Text style={{ color: 'white' }}>{item.name}</Text></Chip>
                    }}/>
                <View style={{flex: 1}}>
                    <FlatList
                        style={{ flex: 1, flexDirection: 'row', flexWrap:'wrap' }}
                        listKey={`projects:${_id}`}
                        data={projects}
                        renderItem={({ item }) =>
                        <Chip key={item.id} style={{ backgroundColor: '#284e57' }}><Text style={{ color: 'white' }}>{item.name}</Text></Chip>}/>
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

export default InterestsPage;