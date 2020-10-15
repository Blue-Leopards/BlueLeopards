import * as React from 'react';
import {
    View,
    FlatList,
} from 'react-native';

import {
    Text, 
    Avatar, 
    Card, 
    Paragraph, 
    Divider,
    Subheading, 
    Chip, 
    Button,
    Caption
} from 'react-native-paper';

import { useAuth } from "../providers/AuthProvider";
import NavigationBar from "../pages/NavigationBar";

const ProfilesPage = () => {
    const { profiles } = useAuth();
        return (
        <View style={{ flex: 6 }}>
            <FlatList
                listKey="profiles"
                data={profiles}
                renderItem={({ item }) => {
                    return (<Profile data={item} />);
                }}
                keyExtractor={(item) => item._id}
                />
            <NavigationBar/>
        </View>
    );
};

const Profile = (props) => {
    const { _id, firstName, lastName, bio, picture, title } = props.data;
    const initials = firstName[0] + lastName[0];
    const LeftContent = props => <Avatar.Text style={{backgroundColor:'#284e57'}} size={50} label={initials} />
    const fullName = firstName + " " + lastName;

    const interests = getInterests(_id);
    const projects = getProjects(_id);

    return (
        <Card style={{ margin: 10 }}>
            <Card.Title title={fullName} subtitle={title} left={LeftContent} />
            <Card.Content style={{ marginBottom: 5 }}>
                <Paragraph>{bio}</Paragraph>
            </Card.Content>
            <View>

                {
                    projects.length > 0
                    ?
                        <Card.Content style={{ flex: 1 }}>
                        <Subheading>Projects</Subheading>
                        <FlatList
                            style={{ flexDirection: 'column', flexWrap: 'wrap', padding: 0}}
                            listKey={`projects:${_id}`}
                            data={projects}
                            renderItem={({ item }) => <Caption style={{borderWidth:0, marginLeft:10, fontSize:15}} key={item.id}>- {item.name}</Caption>} />
                        </Card.Content>
                    : null
                }
                <Card.Content style={{ flex: 1, }}>
                    <FlatList
                        style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', alignContent: 'center', }}
                        listKey={`interests:${_id}`}
                        data={interests}
                        renderItem={({ item }) => 
                            <Chip key={item.id} style={{ backgroundColor: '#8bb9b9' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                            </Chip>} />
                </Card.Content>
            </View>
            <Divider style={{ marginTop: 10 }} />
        </Card>
    );
}

// Given a profile id, find all interests corresponding to that profile
const getInterests = (profileId) => {
    const { profileInterest } = useAuth();
    let interests = [];
    profileInterest
        .filter((item) => {
            return item.profileId === profileId;
        })
        .forEach(item => {
            interests.push({name: item.interestName, id: `${item.profileId}${item.interestId}`});
        });
    return interests;
};

// Given a profile id, find all projects corresponding to that profile
const getProjects = (profileId) => {
    const { profileProject } = useAuth();
    let projects = [];
    profileProject
        .filter((item) => {
            return item.profileId === profileId;
        })
        .forEach(item => {
            projects.push({name: item.projectName, id: `${item.profileId}${item.projectId}`});
        });
    return projects;
}

export default ProfilesPage;