import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import LoadingIndicator from '../components/LoadingIndicator';
import {
  getClientUserKey,
  removeUserFromDatabases,
} from '../actions/Authentication/authActions';

const SettingsScreen = props => {
  // Intial State
  const [user, setUser] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  //Event Handlers
  const setFields = async user => {
    try {
      const key = await getClientUserKey(user);
      setUserKey(key);
      setIsLoaded(true);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setFields(user);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const removeUser = async () => {
    try {
      // First removing user from non-admin database
      await removeUserFromDatabases(userKey, user.displayName);
      // Permanently deleting user from admin database
      await user.delete();
      // Then navigate to phone number entry screen
    } catch (err) {
      console.warn(err);
      signOut();
    }
  };

  const signOut = () => {
    firebase.auth().signOut();
    console.log('Signed Out !');
    props.navigation.navigate('phone');
  };

  const navigateToVideo = () => {
    props.navigation.navigate('Video', {
      userKey,
    });
  };

  const navigateToBio = () => {
    props.navigation.navigate('Bio', {
      userKey,
    });
  };

  return (
    <View>
      {!isLoaded && <LoadingIndicator />}
      {isLoaded && (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={removeUser}>
            <Text style={styles.ButtonText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.ButtonText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToVideo}>
            <Text style={styles.ButtonText}>Edit Profile Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToBio}>
            <Text style={styles.ButtonText}>Edit Your Bio</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  button: {
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: 'red',
    borderWidth: 2,
    marginTop: 25,
    marginBottom: 25,
  },
  ButtonText: {
    color: '#808B96',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  image: {
    height: 20,
    width: 20,
    backgroundColor: 'pink',
  },
});
