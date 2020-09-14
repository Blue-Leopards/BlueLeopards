import React from 'react';

import { View, FlatList } from 'react-native';

import { Text, Avatar, Card, Paragraph, Divider, Subheading, Chip } from 'react-native-paper';


const ProjectsPage = () => {
    return (
        <View style={{ flex: 6 }}>
            <FlatList
                listKey="projects"
                data={DATA}
                renderItem={({ item }) => {
                    return (<Project data={item} />);
                }} />
        </View>
    );
};

const Project = (props) => {
    const { name, description, interests, contributors } = props.data;

    /* Take initials of project name */
    const names = name.split(" ");
    let initials = "";
    for (let i = 0; i < names.length; i++) {
        const word = names[i];
        initials += word[0];
    }

    const LeftContent = props => <Avatar.Text size={50} label={initials} />

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
                        listKey="interests"
                        data={interests}
                        renderItem={({ item, index }) => <Chip style={{ marginRight: 10, backgroundColor: '#51b1a8' }}><Text style={{ color: 'white' }}>{item}</Text></Chip>} />
                </Card.Content>
                <Card.Content style={{ flex: 1 }}>
                    <Subheading>Contributors</Subheading>
                    <FlatList
                        listKey="contributors"
                        data={contributors}
                        renderItem={({ item, index }) => <Paragraph>{item}</Paragraph>} />
                </Card.Content>
            </View>
            <Divider style={{ marginTop: 10 }} />
        </Card>
    );
}













const DATA = [
    {
        pictureURL: '../public/images/default_project.png',
        name: 'Open Power Quality',
        description: 'Open source hardware and software for distributed power quality data collection, analysis, and visualization.',
        interests: ['Software Engineering', 'Renewable Energy'],
        contributors: ['Philip Johnson', 'Anthony Christe', 'Serge Negrashov']
    },
    {
        pictureURL: '../public/images/default_project.png',
        name: 'RadGrad',
        description: 'Growing awesome computer scientists, one graduate at a time.',
        interests: ['Educational Technology'],
        contributors: ['Philip Johnson', 'Carleton Moore']
    },
    {
        pictureURL: '../public/images/default_project.png',
        name: 'WRENCH',
        description: 'WRENCH is an open-source library for developing simulators for large-scale scientific computation.',
        interests: ['Distributed computing'],
        contributors: ['Henri Casanova']
    },
    {
        pictureURL: '../public/images/default_project.png',
        name: 'Cyber Canoe',
        description: 'Software for Unity projects involving stereoscopic resolution driven by 9 PCs with a GeForce 980 graphics card.',
        interests: ['Unity', 'Visualization'],
        contributors: ['Jason Leigh']
    },
];

export default ProjectsPage;