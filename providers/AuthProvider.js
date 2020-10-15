import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { getRealmApp } from "../getRealmApp";
import { Alert } from "react-native";
import { Project } from "../schemas/Project";
import { ProfileInterest } from "../schemas/ProfileInterest";
import { ProfileProject } from "../schemas/ProfileProject";
import { ProjectInterest } from "../schemas/ProjectInterest";

// Access the Realm App.
const app = getRealmApp();

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);
  const [profiles, setProfiles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [interests, setInterests] = useState([]);

  const [profileInterest, setProfileInterest] = useState([]);
  const [profileProject, setProfileProject] = useState([]);
  const [projectInterest, setProjectInterest] = useState([]);

  const realmRef = useRef(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const config = {
      sync: {
        user,
        partitionValue: 'public',
      },
    };

    Realm.open(config).then((realm) => {
      //console.log(Object.getOwnPropertyNames(realm.objects("Profile")));
      realmRef.current = realm;
      const profiles = realm.objects("Profile");
      const projects = realm.objects("Project");
      const interests = realm.objects("Interest");

      const profileInterest = realm.objects("ProfileInterest");
      const profileProject = realm.objects("ProfileProject");
      const projectInterest = realm.objects("ProjectInterest");

      profiles.addListener(() => {
        setProfiles([...profiles]);

      });
      projects.addListener(() => {
        setProjects([...projects]);
      });
      interests.addListener(() => {
        setInterests([...interests]);
      });

      profileInterest.addListener(() => {
        setProfileInterest([...profileInterest]);

      });
      profileProject.addListener(() => {
        setProfileProject([...profileProject]);
      });
      projectInterest.addListener(() => {
        setProjectInterest([...projectInterest]);
      });
    });

    // Return a cleanup function that closes the user realm.
    return () => {
      // cleanup function
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
      }
    };
  }, [user]);

  const getProfiles = async () => {
    let data;
    try {
      data = await user.functions.fetchProfiles();
    } catch (err) {
      Alert.alert("An error occurred while fetching Profiles", err);
    }
    return data;
  };

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.
  const signIn = async (email, password) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    // Use the setUser() function to set the logged-in user.
    setUser(newUser);
  };

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password) => {
    // Pass the email and password to Realm's email password provider to register the user.
    // Registering only registers and does not log in.
    await app.emailPasswordAuth.registerUser(email, password);
  };

  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    // Log out the current user and use the setUser() function to set the current user to null.
    user.logOut();
    setUser(null);
  };

  const createProject = (projectData, profiles, interests) => {
    const realm = realmRef.current;
  
    // Create New Project
    const newProject = new Project({
      name: projectData.name,
      partition: "public",
      homePage: projectData.homePage,
      picture: projectData.picture,
      description: projectData.description
    });
    
    // For each profile, create new ProfileProject
    if(profiles.length > 0) {
      profiles.forEach((profile) => {
        addProfileProject({
          profileId: profile._id,
          profileEmail: profile._email,
          projectId: newProject._id,
          projectName: newProject.name
        });
      });
    }

    // For each interest, create new ProjectInterest
    if(interests.length > 0) {
      interests.forEach((interest) => {
        addProjectInterest({
          projectId: newProject._id,
          projectName: newProject.name,
          interestId: interest._id,
          interestName: interest.name 
        });
      })
    }

    // Insert new project into collection
    realm.write(() => {
      console.log(`Creating Project Doc id:${newProject._id}`)
      realm.create(
        "Project",
        newProject
      );
    });
  };

  const updateUser = async userData => {
    try {
      console.log("Updating user...");
      await user.functions.updateProfileDocument(userData);
    } catch (err) {
      Alert.alert("An error occurred while updating account", err);
    }
  };

  const addProfileInterest = data => {
    const realm = realmRef.current;

    const newProfileInterest = new ProfileInterest({
      profileId: data.profileId,
      profileEmail: data.profileEmail,
      interestId: data.interestId,
      interestName: data.interestName,
    });

    realm.write(() => {
      realm.create(
        "ProfileInterest",
        newProfileInterest
      );
    });
  };

  const addProfileProject = data => {
    const realm = realmRef.current;
    const newProfileProject = new ProfileProject({
      profileId: data.profileId,
      profileEmail: data.profileEmail,
      projectId: data.projectId,
      projectName: data.projectName
    });
    realm.write(() => {
      console.log(`Creating ProfileProject Doc id:${newProfileProject._id}`)
      realm.create(
        "ProfileProject",
        newProfileProject
      );
    });
  }

  const addProjectInterest = data => {
    const realm = realmRef.current;
    const newProjectInterest = new ProjectInterest({
      interestId: data.interestId,
      interestName: data.interestName,
      projectId: data.projectId,
      projectName: data.projectName
    });
    realm.write(() => {
      console.log(`Creating ProjectInterest Doc id:${newProjectInterest._id}`)
      realm.create(
        "ProjectInterest",
        newProjectInterest
      );
    });
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        getProfiles,
        createProject,
        updateUser,
        addProfileInterest,
        addProfileProject,
        user,
        profiles,
        projects,
        interests,
        profileInterest, 
        profileProject, 
        projectInterest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };
