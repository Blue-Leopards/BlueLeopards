import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, 
    Avatar, 
    Card, 
    Paragraph,
    Divider, 
    Subheading, 
    Chip, 
    Button } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";
import NavigationBar from "../pages/NavigationBar";

const ProjectsPage = ({ navigation }) => {
    const { projects } = useAuth();

    return (
        <View style={{ flex: 6 }}>
            <FlatList
                listKey="projects"
                data={projects}
                renderItem={({ item }) => {
                    return (<Project data={item} />);
                }} 
                keyExtractor={(item) => item._id}
                />
            <NavigationBar/>
        </View>
    );
};

const Project = (props) => {
    const { _id, name, description, homePage, picture } = props.data;

    /* Take initials of project name */
    const names = name.split(" ");
    let initials = "";
    for (let i = 0; i < names.length; i++) {
        const word = names[i];
        initials += word[0];
    }

    const LeftContent = props => <Avatar.Text size={50} label={initials} />
    const interests = getInterests(_id);
    const profiles = getProfiles(_id);

    getProfiles(_id);
    return (
        <Card style={{ margin: 10 }}>
            <Card.Title title={name} left={LeftContent} />
            <Card.Content style={{ marginBottom: 5 }}>
                <Paragraph>{description}</Paragraph>
            </Card.Content>
            <View>
                <Card.Content style={{ flex: 1 }}>
                    <FlatList
                        style={{ flexDirection: 'row' }}
                        listKey={`interests:${_id}`}
                        data={interests}
                        renderItem={({ item, index }) => <Chip key={item.id} style={{ marginRight: 10, backgroundColor: '#51b1a8' }}><Text style={{ color: 'white' }}>{item.name}</Text></Chip>} />
                </Card.Content>
                <Card.Content style={{ flex: 1 }}>
                    <Subheading>Contributors</Subheading>
                    <FlatList
                        listKey={`contributors:${_id}`}
                        data={profiles}
                        renderItem={({ item, index }) => <Paragraph key={item.id}>{item.name}</Paragraph>} />
                </Card.Content>
            </View>
            <Divider style={{ marginTop: 10 }} />
        </Card>
    );
}

const getInterests = (projectId) => {
    const { projectInterest } = useAuth();
    let interests = [];
    projectInterest
        .filter(item => {
            return item.projectId === projectId;
        })
        .forEach(item => {
            interests.push({name: item.interestName, id: `${item.projectId}${item.interestId}`});
        });
    return interests;
};

const getProfiles = (projectId) => {
    const { profileProject } = useAuth();

    let profileIds = [];
    let profileObjects = [];

    // First get all profile Ids
    profileProject
        .filter(item => item.projectId === projectId)
        .forEach(item => {
            profileIds.push(item.profileId)
        });
    // Loop through profiles collection and get all names
    profileIds
        .forEach(id => {
            const temp = getProfileData(id);
            profileObjects.push({
                name: temp.name,
                id: `${projectId}${temp.id}`
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

const Nav = ({ navigation}) =>
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
        id:'10',
        pictureURL: '../public/images/default_project.png',
        name: 'Open Power Quality',
        description: 'Open source hardware and software for distributed power quality data collection, analysis, and visualization.',
        interests: ['Software Engineering', 'Renewable Energy'],
        contributors: ['Philip Johnson', 'Anthony Christe', 'Serge Negrashov']
    },
    {
        id:'20',
        pictureURL: '../public/images/default_project.png',
        name: 'RadGrad',
        description: 'Growing awesome computer scientists, one graduate at a time.',
        interests: ['Educational Technology'],
        contributors: ['Philip Johnson', 'Carleton Moore']
    },
    {
        id:'30',
        pictureURL: '../public/images/default_project.png',
        name: 'WRENCH',
        description: 'WRENCH is an open-source library for developing simulators for large-scale scientific computation.',
        interests: ['Distributed computing'],
        contributors: ['Henri Casanova']
    },
    {
        id:'40',
        pictureURL: '../public/images/default_project.png',
        name: 'Cyber Canoe',
        description: 'Software for Unity projects involving stereoscopic resolution driven by 9 PCs with a GeForce 980 graphics card.',
        interests: ['Unity', 'Visualization'],
        contributors: ['Jason Leigh']
    },
];

export default ProjectsPage;