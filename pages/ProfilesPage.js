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
    Button
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
    const LeftContent = props => <Avatar.Text size={50} label={initials} />
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
                <Card.Content style={{ flex: 1 }}>
                    <FlatList
                        style={{ flexDirection: 'row' }}
                        listKey={`interests:${_id}`}
                        data={interests}
                        renderItem={({ item, index }) => <Chip key={item.id} style={{ marginRight: 10, backgroundColor: '#51b1a8' }}><Text style={{ color: 'white' }}>{item.name}</Text></Chip>} />
                </Card.Content>
                {
                    projects.length > 0
                    ?
                        <Card.Content style={{ flex: 1 }}>
                        <Subheading>Projects</Subheading>
                        <FlatList
                            listKey={`projects:${_id}`}
                            data={projects}
                            renderItem={({ item, index }) => <Paragraph key={item.id}>{item.name}</Paragraph>} />
                        </Card.Content>
                    : null
                }
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

const Nav = ({navigation}) =>
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

export default ProfilesPage;