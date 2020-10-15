import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { TextInput, Button, Title, Searchbar, Card, Subheading, Paragraph, Divider, Avatar, Chip, Text, Caption } from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";

const FilterPage = () => {
    const { interests, profiles, profileInterest, user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [ matchingInterests, setMatchingInterests] = useState([]);
    const [ matchingProfiles, setMatchingProfiles] = useState([]);
    const [ matchingProfileDocuments, setMatchProfileDocuments ] = useState([]);

    const onQueryChange = query => {
        setSearchQuery(query);

        // Find Interests matching query
        const _matchingInterests = interests.filter(interest => {
            const interestName = interest.name.toLowerCase();
            return interestName.includes(query.toLowerCase());
        });
        setMatchingInterests(_matchingInterests);

        // Find Profiles who have those interests
        const _matchingProfilesInterest = profileInterest.filter(item => {
            let isMatching = false;
            matchingInterests.forEach(interest => {
                if(interest._id === item.interestId) {
                    isMatching = true;
                }
            });
        // isMatching is true when at least one interest in matchingInterest's id
        // matches item.interestId add to _matchingProfilesInterest
            return isMatching; 
        });
        // Add profileIds to matchingProfiles
        let _matchingProfiles = [];
        _matchingProfilesInterest.forEach((item) => {
            _matchingProfiles.push(item.profileId);
        });
        // Remove Duplicates
        setMatchingProfiles([...new Set(_matchingProfiles)]);

        // Now filter out profile collection using those ids
        const matchingDocuments = profiles.filter(profileDoc => {
            return matchingProfiles.includes(profileDoc._id);
        });
        setMatchProfileDocuments(matchingDocuments);
        console.log("Matching Profiles:");
        console.log(matchingProfileDocuments);
    };

    return (
        <View style={{padding:10}}>
            <View>
            <Title>Filter by Interests</Title>
            <Searchbar
                placeholder="Search"
                onChangeText={onQueryChange}
                value={searchQuery}
            />
            </View>

            <View style={{marginTop: 10}}>
                <Title>
                    Profiles
                </Title>

                <FlatList
                    listKey={`matchingProfiles:${user.customData._id}`}
                    data={matchingProfileDocuments}
                    renderItem={({ item }) => {
                        return (<Profile data={item} />);
                    }}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </View>
        
    
    );
}

const Profile = (props) => {
    const { _id, firstName, lastName, bio, picture, title } = props.data;
    const initials = firstName[0] + lastName[0];
    const LeftContent = props => <Avatar.Text style={{backgroundColor:'#284e57'}} size={50} label={initials} />
    const fullName = firstName + " " + lastName;

    const interests = getInterests(_id);
    const projects = getProjects(_id);

    return (
        <Card style={{ margin: 10 }}>
            <Card.Title title={fullName} subtitle={title} left={LeftContent} />
            <Card.Content style={{ marginBottom: 5 }}>
                <Paragraph>{bio}</Paragraph>
            </Card.Content>
            <View>
                <Card.Content style={{ flex: 1 }}>
                    <FlatList
                        style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', alignContent: 'center', }}
                        listKey={`interests:${_id}`}
                        data={interests}
                        renderItem={({ item, index }) => 
                            <Chip key={item.id} style={{ marginRight: 10, backgroundColor: '#8bb9b9' }}>
                                <Text style={{ color: 'white' }}>{item.name}</Text>
                            </Chip>} />
                </Card.Content>
                {
                    projects.length > 0
                    ?
                        <Card.Content style={{ flex: 1 }}>
                        <Subheading>Projects</Subheading>
                        <FlatList
                            listKey={`projects:${_id}`}
                            data={projects}
                            renderItem={({ item }) => <Caption style={{borderWidth:0, marginLeft:10, fontSize:15}} key={item.id}>- {item.name}</Caption>} />
                        </Card.Content>
                    : null
                }
            </View>
            <Divider style={{ marginTop: 10 }} />
        </Card>
    );
}

// Given a profile id, find all interests corresponding to that profile
const getInterests = (profileId) => {
    const { profileInterest } = useAuth();
    let interests = [];
    profileInterest
        .filter((item) => {
            return item.profileId === profileId;
        })
        .forEach(item => {
            interests.push({name: item.interestName, id: `${item.profileId}${item.interestId}`});
        });
    return interests;
};

// Given a profile id, find all projects corresponding to that profile
const getProjects = (profileId) => {
    const { profileProject } = useAuth();
    let projects = [];
    profileProject
        .filter((item) => {
            return item.profileId === profileId;
        })
        .forEach(item => {
            projects.push({name: item.projectName, id: `${item.profileId}${item.projectId}`});
        });
    return projects;
}

export default FilterPage;