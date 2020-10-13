import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { View, Text } from 'react-native';

import { Button } from 'react-native-paper';

import { AuthProvider } from "./providers/AuthProvider";


// Import Views
import HomePage from './pages/HomePage';
//import WelcomePage from './pages/WelcomePage';
import ProfilesPage from './pages/ProfilesPage';
import ProjectsPage from './pages/ProjectsPage';
import InterestsPage from './pages/InterestsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AccountPage from './pages/AccountPage';
import AddProjectPage from './pages/AddProjectPage';
import FilterPage from './pages/FilterPage';
import SettingsPage from './pages/SettingsPage';
import { WelcomeView } from './pages/WelcomePage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
          {/* <HomePage/> */}
          {/* <ProfilesPage/> */}
          {/* <ProjectsPage/> */}
          {/* <InterestsPage /> */}
          {/* <NavigationBar/> */}
          {/* <SignUpPage/> */}
          {/* <LoginPage/> */}
          {/* <AccountPage/> */}
          {/* <AddProjectPage/> */}
          {/* <FilterPage/> */}
        <View style={{flex:1, backgroundColor: "#eae9ef"}}>
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={WelcomeView}
              />
            <Stack.Screen
              name="Profiles"
              component={ProfilesPage}
              />
            <Stack.Screen
              name="Projects"
              component={ProjectsPage}
              />
            <Stack.Screen
              name="Interests"
              component={InterestsPage}
              />
            <Stack.Screen
              name="Login"
              component={LoginPage}
              />
            <Stack.Screen
              name="SignUp"
              component={SignUpPage}
              />
            <Stack.Screen
              name="Account"
              component={AccountPage}
              />
            <Stack.Screen
              name="AddProject"
              component={AddProjectPage}
              />
            <Stack.Screen
              name="Filter"
              component={FilterPage}
              />
            <Stack.Screen
              name="Settings"
              component={SettingsPage}
              />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
};


export default App;
