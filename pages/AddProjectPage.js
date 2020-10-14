import React, { useEffect, useState } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import {
    TextInput,
    Button,
    Title,
    Chip,
    Text,
} from 'react-native-paper';
import { useAuth } from "../providers/AuthProvider";

const buttonStyle = {
  padding: 0, margin: 0
};
const buttonTextStyle = {
    fontSize:10,
    padding: 0, margin: 0
};

const AddProjectPage = () => {
    const { createProject } = useAuth();
    const { interests } = useAuth();
    const [name, setName ] = React.useState("");
    const [description, setDescription ] = React.useState("");
    const [homePage, setHomePage ] = React.useState("");
    const [picture, setPicture ] = React.useState("");

    const [selectedInterests, setSelectedInterests] = useState([]);
    const [interestChips, setInterestChips] = useState([]);
    
    useEffect(() => {
        let startingInterests = [];
        interests.forEach(interest => {
            startingInterests.push({
                interestId: interest._id,
                interestName: interest.name,
                selected: false
            });
        });
        setInterestChips([...startingInterests]);
    }, []);

    console.log(interestChips);
    return (
        <ScrollView style={{padding:10, flex:1}}>
            <TextInput
                label="Name"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={text => setDescription(text)}
            />
            <TextInput
                label="Homepage"
                value={homePage}
                onChangeText={text => setHomePage(text)}
            />
            <TextInput
                label="Picture URL"
                value={picture}
                onChangeText={text => setPicture(text)}
            />
                <FlatList
                    listKey="interests"
                    data={interestChips}
                    renderItem={({ item }) => {
                        return (
                            <Button 
                                compact={true} 
                                style={buttonStyle}
                                labelStyle={buttonTextStyle}>
                                {item.interestName}
                            </Button>
                        );
                    }}
                    keyExtractor={(item) => item.interestId}
                    />

            <Button
                mode="contained" 
                onPress={() => {createProject()}}
                style={{marginTop:10}}>
                Create
            </Button>


        </ScrollView>
    );
}

export default AddProjectPage;