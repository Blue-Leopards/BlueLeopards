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

const FilterPage = () => {

    return (
        <View style={{padding:40}}>
            <View>
            <Title>Filter by Interests</Title>
            <MyInput category="Interests"/>

            <Button
                mode="contained" 
                onPress={()=>console.log("Pressed Filter Button!")}
                style={{marginTop:10}}>
                Submit
            </Button>
            </View>

            <View style={{marginTop: 40}}>
                <Title>
                    Profiles
                </Title>
            </View>
        </View>
        
    
    );
}

export default FilterPage;