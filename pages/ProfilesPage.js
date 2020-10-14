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

const ProfilesPage = ({navigation}) => {
    const { profiles, projects, interests } = useAuth();

    console.log("Profiles Page:");
    console.log(projects);
    
    return (
        <View style={{ flex: 6 }}>
            {/* <FlatList
                listKey="profiles"
                data={DATA}
                renderItem={({ item }) => {
                    return (<Profile data={item} />);
                }}
                keyExtractor={(item) => item.id}
                /> */}
            {profiles.map((item) => <Text>{item.firstName}</Text>)}
            <Text></Text>
            <Nav navigation={navigation}/>
        </View>
    );
}

const Profile = (props) => {
    const { firstName, lastName, bio, picture, title } = props.data;
    /* Take initials of Profile */
    const names = name.split(" ");
    let initials = "";
    for (let i = 0; i < names.length; i++) {
        const word = names[i];
        initials += word[0];
    }

    const LeftContent = props => <Avatar.Text size={50} label={initials} />

    return (
        <Card style={{ margin: 10 }}>
            <Card.Title title={name} subtitle={occupation} left={LeftContent} />
            <Card.Content style={{ marginBottom: 5 }}>
                <Paragraph>{bio}</Paragraph>
            </Card.Content>
            <View>
                <Card.Content style={{ flex: 1 }}>
                    <FlatList
                        style={{ flexDirection: 'row' }}
                        listKey="interests"
                        data={interests}
                        renderItem={({ item, index }) => <Chip style={{ marginRight: 10, backgroundColor: '#51b1a8' }}><Text style={{ color: 'white' }}>{item}</Text></Chip>} />
                </Card.Content>
                <Card.Content style={{ flex: 1 }}>
                    <Subheading>Projects</Subheading>
                    <FlatList
                        listKey="projects"
                        data={projects}
                        renderItem={({ item, index }) => <Paragraph>{item}</Paragraph>} />
                </Card.Content>
            </View>
            <Divider style={{ marginTop: 10 }} />
        </Card>
    );
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

const DATA = [
    {
        id: '10',
        name: 'Philip Johnson',
        occupation: 'Professor',
        bio: 'I am a Professor and like to paddle outrigger canoes.',
        pictureURL: '../public/images/default_profile.jpg',
        interests: [
            'Software Engineering',
            'Climate Change'
        ],
        projects: [
            'RadGrad',
            'Open Power Quality'
        ]
    },
    {
        id: '20',
        name: 'Henri Casanova',
        occupation: 'Professor',
        bio: 'In my spare time, I like to scuba dive.',
        pictureURL: 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
        interests: [
            'HPC',
            'Distributed Computing'
        ],
        projects: [
            'Wrench',
        ]
    },
    {
        id: '30',
        name: 'Carleton Moore',
        occupation: 'Assistant Professor',
        bio: 'Every summer, I enjoy visiting Portland, Oregon.',
        pictureURL: 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
        interests: [
            'Software Engineering',
            'Renewable Energy'
        ],
        projects: [
            'RadGrad',
        ]
    },
    {
        id: '40',
        name: 'Anthony Christe',
        occupation: 'Ph.D. Student',
        bio: 'I enjoy competitive bicycle racing',
        pictureURL: 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
        interests: [
            'AI',
            'Distributed Computing'
        ],
        projects: [
            'Open Power Quality',
        ]
    },
    {
        id: '50',
        name: 'Jason Leigh',
        occupation: 'Professor',
        bio: 'I escaped from Chicago and moved to Hawaii in 2014.',
        pictureURL: 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
        interests: [
            'Visualization',
        ],
        projects: [
            'Cyber Canoe',
        ]
    },
    {
        id: '60',
        name: 'Serge Negrashov',
        occupation: 'Ph.D. Student',
        bio: 'Most weekends, you can find me on my 8 foot dinghy.',
        pictureURL: 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
        interests: [
            'Scalable IP Networks',
        ],
        projects: [
            'Open Power Quality',
        ]
    },
];

export default ProfilesPage;