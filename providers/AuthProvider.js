import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { getRealmApp } from "../getRealmApp";
import { Alert } from "react-native";

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
  const realmRef = useRef(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    //console.log(Object.getOwnPropertyNames(user));
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

      profiles.addListener(() => {
        setProfiles([...profiles]);

      });
      projects.addListener(() => {
        setProjects([...projects]);
      });
      interests.addListener(() => {
        setInterests([...interests]);
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

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        getProfiles,
        user,
        profiles,
        projects,
        interests
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
