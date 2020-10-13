import React from 'react';

import { View, FlatList } from 'react-native';

import {
    Avatar, 
    Card, 
    Title, 
    Divider, 
    Subheading, 
    Button } from 'react-native-paper';

const InterestsPage = ({ navigation }) => {
    return (
        <View style={{flex: 6}}>
            <FlatList
                listKey="interests"
                data={DATA}
                renderItem={({item}) => {
                    return (<Interest data={item}/>);
                }}
                keyExtractor={(item) => item.id}
                />
            <Nav navigation={navigation}/>
        </View>
    );
};

const Interest = (props) => {
    const { name, contributors, projects } = props.data;

    let contributorNames = [];
    let projectNames = [];

    /* Take initials of contributors */
    for (let i = 0; i < contributors.length; i++) {

        let contributorInitials = "";
        let contributorName = contributors[i].split(" ");

        for (let j = 0; j < contributorName.length; j++) {
            const word = contributorName[j];
            contributorInitials += word[0];    // Take initial
        }
        contributorNames.push(contributorInitials);
    }

    /* Take initials of projects */
    for (let i = 0; i < projects.length; i++) {

        let projectInitials = "";
        let projectName = projects[i].split(" ");

        for (let j = 0; j < projectName.length; j++) {
            const word = projectName[j];
            projectInitials += word[0];    // Take initial
        }
        projectNames.push(projectInitials);
    }

    return (
        <Card style={{ margin: 10, padding: 10 }}>
            <Title>{name}</Title>
            <Divider style={{ margin: 10 }} />
            <Card.Content style={{marginTop: 10, flex:1, flexDirection:'row'}}>
                <FlatList
                    style={{ flex: 1, flexDirection: 'row' }}
                    listKey="contributors"
                    data={contributorNames}
                    renderItem={({ item, index }) =>
                        <Avatar.Text style={{ flex: 1, marginRight: 15 }} size={50} label={item} />} />
                <View style={{flex: 1}}>
                    <Subheading>Projects</Subheading>
                    <FlatList
                        style={{ flex: 1, flexDirection: 'row' }}
                        listKey="projects"
                        data={projectNames}
                        renderItem={({ item, index }) =>
                            <Avatar.Text style={{ flex: 1, backgroundColor: '#51b1a8' }} size={50} label={item} />} />
                </View>
            </Card.Content>
        </Card>
    );
}

const Nav = ({ navigation }) =>
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
            <Button>Settings</Button>
        </View>
    </View>;

const DATA = [
    {
        id:'10',
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
        id:'20',
        name: 'Climate Change',
        contributors: [
            'Philip Johnson',
        ],
        projects: []
    },
    {
        id:'30',
        name: 'HPC',
        contributors: [
            'Henri Casanova',
        ],
        projects: []
    },
    {
        id:'40',
        name: 'Distributed Computing',
        contributors: [
            'Henri Casanova',
            'Anthony Christe'
        ],
        projects: []
    },
    {
        id:'50',
        name: 'Renewable Energy',
        contributors: [
            'Carleton Moore',
        ],
        projects: [
            'Open Power Quality',
        ]
    },
    {
        id:'60',
        name: 'AI',
        contributors: [
            'Anthony Christe',
        ],
        projects: []
    },
    {
        id:'70',
        name: 'Visualization',
        contributors: [
            'Jason Leigh',
        ],
        projects: [
            'Cyber Canoe',
        ]
    },
    {
        id:'80',
        name: 'Scalable IP Networks',
        contributors: [
            'Serge Negrashov',
        ],
        projects: []
    },
    {
        id:'90',
        name: 'Educational Technology',
        contributors: [],
        projects: [
            'RadGrad',
        ]
    },
    {
        id:'100',
        name: 'Distributed computing',
        contributors: [],
        projects: [
            'WRENCH',
        ]
    },
    {
        id:'110',
        name: 'Unity',
        contributors: [],
        projects: [
            'Cyber Canoe',
        ]
    },
]

export default InterestsPage;