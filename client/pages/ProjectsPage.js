import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    FlatList
  } from 'react-native';

const ProjectsPage = () => {
    return (
        <View style={{flex: 6}}>
            <FlatList
                listKey="projects"
                data={DATA}
                renderItem={({item}) => {
                    return (<Project data={item}/>);
                }}/>
        </View>
    );
};

const Project = (props) => {
    const {name, description, interests, contributors} = props.data;
    return (
        <View style={{borderWidth: 1}}>
            <Image source={require('../public/images/default_project.png')} style={{ width: 40, height: 40 }} />
            <Text>{name}</Text>
            <Text>{description}</Text>
            <Text>Tags:</Text>
            <FlatList
            listKey="interests"
                data={interests}
                renderItem={({item, index}) => <Text>- {item}</Text>}/>
            <Text>Contributors:</Text>
            <FlatList
                listKey="contributors"
                data={contributors}
                renderItem={({item, index}) => <Text>- {item}</Text>}/>
        </View>
    );
};

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