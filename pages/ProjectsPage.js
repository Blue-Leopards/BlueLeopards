import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, Avatar, Card, Paragraph, Divider, Subheading, Chip, Caption } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";
import NavigationBar from "../pages/NavigationBar";

const ProjectsPage = () => {
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
                        style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', alignContent: 'center', }}
                        listKey={`interests:${_id}`}
                        data={interests}
                        renderItem={({ item, index }) => <Chip key={item.id} style={{ backgroundColor: '#51b1a8' }}><Text style={{ color: 'white' }}>{item.name}</Text></Chip>} />
                </Card.Content>
                <Card.Content style={{ flex: 1 }}>
                    <Subheading>Contributors</Subheading>
                    <FlatList
                        listKey={`contributors:${_id}`}
                        data={profiles}
                        renderItem={({ item, index }) => <Caption style={{borderWidth:0, marginLeft:10, fontSize:15}} key={item.id}>- {item.name}</Caption>} />
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

export default ProjectsPage;