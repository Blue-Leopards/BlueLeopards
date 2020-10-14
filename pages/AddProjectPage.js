import React from 'react';
import { View } from 'react-native';

import {
    TextInput,
    Button,
    Title
} from 'react-native-paper';

import { useAuth } from "../providers/AuthProvider";


const MyInput = (props) => {
    const [text, setText] = React.useState('');

    return (
        <TextInput
            label={props.category}
            placeholder={props.placeholder}
            value={text}
            onChangeText={text => setText(text)}
        />
    );
};

const AddProjectPage = () => {
    const { createProject } = useAuth();

    const [name, setName ] = React.useState("");
    const [description, setDescription ] = React.useState("");
    const [homePage, setHomePage ] = React.useState("");
    const [picture, setPicture ] = React.useState("");

    return (
        <View style={{padding:40}}>
            <Title>Add A Project</Title>

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
            <MyInput category="Interests"/>
            <MyInput category="Contributors"/>

            <Button
                mode="contained" 
                onPress={()=> {createProject()}}
                style={{marginTop:10}}>
                Create
            </Button>
        </View>
    );
}

export default AddProjectPage;