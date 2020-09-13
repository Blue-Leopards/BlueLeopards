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



const ProfilesPage = () => {
    return (
        <View style={{flex: 6}}>
            <FlatList
                listKey="profiles"
                data={profiles}
                renderItem={({item}) => {
                    return (<Profile data={item}/>);
                }}/>
        </View>
    );
}

const Profile = (props) => {
    const pic = props.pictureURL;
    const {name, occupation, bio, pictureURL, interests, projects} = props.data;
    console.log(interests);
    return (
        <View style={{borderWidth: 1}}>
            <Text>{name}</Text>
            <Text>{occupation}</Text>
            <Text>{bio}</Text>
            <Image source={require('../public/images/default_profile.jpg')} style={{ width: 40, height: 40 }} />
            <Text>Interests:</Text>
            <FlatList
                listKey="interests"
                data={interests}
                renderItem={({item, index}) => <Text>- {item}</Text>}/>
            <Text>Projects:</Text>
            <FlatList
                listKey="projects"
                data={projects}
                renderItem={({item, index}) => <Text>- {item}</Text>}/>
        </View>
    );
}

const profiles = [
    {
        id: '10',
        name: 'Philip Johnson',
        occupation:'Professor',
        bio:'I am a Professor and like to paddle outrigger canoes.',
        pictureURL:'../public/images/default_profile.jpg',
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
        name:'Henri Casanova',
        occupation:'Professor',
        bio:'In my spare time, I like to scuba dive.',
        pictureURL:'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
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
        name:'Carleton Moore',
        occupation:'Assistant Professor',
        bio:'Every summer, I enjoy visiting Portland, Oregon.',
        pictureURL:'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
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
        name:'Anthony Christe',
        occupation:'Ph.D. Student',
        bio:'I enjoy competitive bicycle racing',
        pictureURL:'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
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
        name:'Jason Leigh',
        occupation:'Professor',
        bio:'I escaped from Chicago and moved to Hawaii in 2014.',
        pictureURL:'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
        interests: [
            'Visualization',
        ],
        projects: [
            'Cyber Canoe',
        ]
    },
    {
        id: '60',
        name:'Serge Negrashov',
        occupation:'Ph.D. Student',
        bio:'Most weekends, you can find me on my 8 foot dinghy.',
        pictureURL:'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
        interests: [
            'Scalable IP Networks',
        ],
        projects: [
            'Open Power Quality',
        ]
    },
];

export default ProfilesPage;