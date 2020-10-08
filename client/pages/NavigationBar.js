import React from 'react';

import { BottomNavigation, Text } from 'react-native-paper';

const ProfilesRoute = () => <Text>Profiles</Text>;
const ProjectsRoute = () => <Text>Projects</Text>;
const InterestsRoute = () => <Text>Interests</Text>;
const SettingsRoute = () => <Text>Settings</Text>;

const NavigationBar = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'profiles', title: 'Profiles', icon: '' },
      { key: 'projects', title: 'Projects', icon: '' },
      { key: 'interests', title: 'Interests', icon: '' },
      { key: 'settings', title: 'Settings', icon: '' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
      profiles: ProfilesRoute,
      projects: ProjectsRoute,
      interests: InterestsRoute,
      settings: SettingsRoute
    });

    return(
        <BottomNavigation
            navigationState={{ index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

  export default NavigationBar;