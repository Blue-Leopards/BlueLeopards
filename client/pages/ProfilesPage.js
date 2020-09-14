import * as React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    StatusBar,
    Image,
    FlatList
  } from 'react-native';

import {     Text,
    Avatar, Button, Card, Title, Paragraph, Divider,
    Subheading, Chip } from 'react-native-paper';

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

// const Profile = (props) => {
//     const pic = props.pictureURL;
//     const {name, occupation, bio, pictureURL, interests, projects} = props.data;
//     console.log(interests);
//     return (
//         <View style={{borderWidth: 1}}>
//             <Text>{name}</Text>
//             <Text>{occupation}</Text>
//             <Text>{bio}</Text>
//             <Image source={require('../public/images/default_profile.jpg')} style={{ width: 40, height: 40 }} />
//             <Text>Interests:</Text>
//             <FlatList
//                 listKey="interests"
//                 data={interests}
//                 renderItem={({item, index}) => <Text>- {item}</Text>}/>
//             <Text>Projects:</Text>
//             <FlatList
//                 listKey="projects"
//                 data={projects}
//                 renderItem={({item, index}) => <Text>- {item}</Text>}/>
//         </View>
//     );
// }

const DefaultPicture = () => 
    <Image 
        source={require('../public/images/default_profile.jpg')} 
        style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />

const Profile = (props) => {
    const {name, occupation, bio, pictureURL, interests, projects} = props.data;

    /* Take initials of Profile */
    const names = name.split(" ");
    let initials = "";
    for(let i = 0; i < names.length; i++) {
        const word = names[i];
        initials += word[0];
    }

    const LeftContent = props => <Avatar.Text size={50} label={initials} />

    return (
        <Card style={{margin: 10}}>
            <Card.Title title={name} subtitle={occupation} left={LeftContent} />
            <Card.Content style={{marginBottom: 5}}>
                <Paragraph>{bio}</Paragraph>
            </Card.Content>
            <View>
                <Card.Content style={{flex:1}}>
                    <FlatList
                        style={{flexDirection: 'row'}}
                        listKey="interests"
                        data={interests}
                        renderItem={({ item, index }) => <Chip style={{marginRight:10, backgroundColor:'#51b1a8'}}><Text style={{color:'white'}}>{item}</Text></Chip>} />
                </Card.Content>
                <Card.Content style={{flex:1}}>
                    <Subheading>Projects</Subheading>
                    <FlatList
                        listKey="projects"
                        data={projects}
                        renderItem={({ item, index }) => <Paragraph>{item}</Paragraph>} />            
                </Card.Content>
            </View>
            <Divider style={{marginTop: 10}} />
        </Card>
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