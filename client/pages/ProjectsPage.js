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

        </View>
    );
};

const DATA = [
    {
        pictureURL: '',
        name: 'Open Power Quality',
        description: 'Open source hardware and software for distributed power quality data collection, analysis, and visualization.',
        interests: ['Software Engineering', 'Renewable Energy'],
        contributors: ['Philip Johnson', 'Anthony Christe', 'Serge Negrashov']
    },
    {
        pictureURL: '',
        name: 'RadGrad',
        description: 'Growing awesome computer scientists, one graduate at a time.',
        interests: ['Educational Technology'],
        contributors: ['Philip Johnson', 'Carleton Moore']
    },
    {
        pictureURL: '',
        name: 'WRENCH',
        description: 'WRENCH is an open-source library for developing simulators for large-scale scientific computation.',
        interests: ['Distributed computing'],
        contributors: ['Henri Casanova']
    },
    {
        pictureURL: '',
        name: 'Cyber Canoe',
        description: 'Software for Unity projects involving stereoscopic resolution driven by 9 PCs with a GeForce 980 graphics card.',
        interests: ['Unity', 'Visualization'],
        contributors: ['Jason Leigh']
    },
];

export default ProjectsPage;