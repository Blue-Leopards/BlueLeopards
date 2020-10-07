import React from 'react';
import {
    View,
} from 'react-native';

import {
    TextInput,
    Button,
    Title
} from 'react-native-paper';


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

    return (
        <View style={{padding:40}}>
            <Title>Add A Project</Title>
            <MyInput category="Name"/>
            <MyInput category="Picture URL"/>
            <MyInput category="Homepage"/>
            <MyInput category="Description"/>

            <MyInput category="Interests"/>
            <MyInput category="Contributors"/>

            <Button
                mode="contained" 
                onPress={()=>console.log("Pressed Update Account Button!")}
                style={{marginTop:10}}>
                Create
            </Button>
        </View>
    );
}

export default AddProjectPage;