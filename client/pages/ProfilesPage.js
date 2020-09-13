import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';



const ProfilesPage = () => {

    return (
        <View style={{flex: 1}}>

        </View>
    );
}

const Profiles = [
    {
        name: 'Philip Johnson',
        occupation:'Professor',
        bio:'I am a Professor and like to paddle outrigger canoes.',
        pictureURL:'',
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
        name:'Henri Casanova',
        occupation:'Professor',
        bio:'In my spare time, I like to scuba dive.',
        pictureURL:'',
        interests: [
            'HPC',
            'Distributed Computing'
        ],
        projects: [
            'Wrench',
        ]
    },
    {
        name:'Carleton Moore',
        occupation:'Assistant Professor',
        bio:'Every summer, I enjoy visiting Portland, Oregon.',
        pictureURL:'',
        interests: [
            'Software Engineering',
            'Renewable Energy'
        ],
        projects: [
            'RadGrad',
        ]
    },
    {
        name:'Anthony Christe',
        occupation:'Ph.D. Student',
        bio:'I enjoy competitive bicycle racing',
        pictureURL:'',
        interests: [
            'AI',
            'Distributed Computing'
        ],
        projects: [
            'Open Power Quality',
        ]
    },
    {
        name:'Jason Leigh',
        occupation:'Professor',
        bio:'I escaped from Chicago and moved to Hawaii in 2014.',
        pictureURL:'',
        interests: [
            'Visualization',
        ],
        projects: [
            'Cyber Canoe',
        ]
    },
    {
        name:'Serge Negrashov',
        occupation:'Ph.D. Student',
        bio:'Most weekends, you can find me on my 8 foot dinghy.',
        pictureURL:'',
        interests: [
            'Scalable IP Networks',
        ],
        projects: [
            'Open Power Quality',
        ]
    },
];

export default ProfilesPage;