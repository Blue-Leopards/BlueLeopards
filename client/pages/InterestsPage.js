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

const InterestsPage = () => {
    return (
        <View style={{flex: 6}}>
            <FlatList
                listKey="interests"
                data={DATA}
                renderItem={({item}) => {
                    return (<Interest data={item}/>);
                }}/>
        </View>
    );
};

const Interest = (props) => {
    const {name, contributors, projects } = props.data;
    return (
        <View style={{borderWidth: 1}}>
            <Text>{name}</Text>
            { contributors.length === 0
                ? <></>
                : <Text>Contributors:</Text>}
            <FlatList
                listKey="contributors"
                data={contributors}
                renderItem={({item, index}) => <Text>- {item}</Text>}/>
            { projects.length === 0 
                ? <></>
                : <Text>Projects:</Text>
            }
            <FlatList
                listKey="projects"
                data={projects}
                renderItem={({item, index}) => <Text>- {item}</Text>}/>
        </View>
    );
};

const DATA = [
    {
        name: 'Software Engineering',
        contributors: [
            'Philip Johnson',
            'Carleton Moore'
        ],
        projects: [
            'Open Power Quality',
        ]
    },
    {
        name: 'Climate Change',
        contributors: [
            'Philip Johnson',
        ],
        projects: []
    },
    {
        name: 'HPC',
        contributors: [
            'Henri Casanova',
        ],
        projects: []
    },
    {
        name: 'Distributed Computing',
        contributors: [
            'Henri Casanova',
            'Anthony Christe'
        ],
        projects: []
    },
    {
        name: 'Renewable Energy',
        contributors: [
            'Carleton Moore',
        ],
        projects: [
            'Open Power Quality',
        ]
    },
    {
        name: 'AI',
        contributors: [
            'Anthony Christe',
        ],
        projects: []
    },
    {
        name: 'Visualization',
        contributors: [
            'Jason Leigh',
        ],
        projects: [
            'Cyber Canoe',
        ]
    },
    {
        name: 'Scalable IP Networks',
        contributors: [
            'Serge Negrashov',
        ],
        projects: []
    },
    {
        name: 'Educational Technology',
        contributors: [],
        projects: [
            'RadGrad',
        ]
    },
    {
        name: 'Distributed computing',
        contributors: [],
        projects: [
            'WRENCH',
        ]
    },
    {
        name: 'Unity',
        contributors: [],
        projects: [
            'Cyber Canoe',
        ]
    },
]

export default InterestsPage;