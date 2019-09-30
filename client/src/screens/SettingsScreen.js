import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { removeUserFromDatabases } from '../actions/authActions';

const SettingsScreen = ({ navigation, userkey, user }) => {
  const { username } = user;
  // Intial State
  const [firebaseUser, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  //Event Handlers
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setIsLoaded(true);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signOut = () => {
    firebase.auth().signOut();
    console.log('Signed Out !');
    navigation.navigate('phone');
  };

  const removeUser = async () => {
    try {
      // First removing user from non-admin database
      await removeUserFromDatabases(userkey, username);
      // Permanently deleting user from admin database
      await firebaseUser.delete();
      // Then navigate to phone number entry screen
    } catch (err) {
      console.warn(err);
      signOut();
    }
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Video')}
          >
            <Text style={styles.ButtonText}>Edit Profile Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Bio')}
          >
            <Text style={styles.ButtonText}>Edit Your Bio</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

SettingsScreen.propTypes = {
  user: PropTypes.object.isRequired,
  userkey: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  user: state.auth.user,
  userkey: state.auth.userkey,
});

export default connect(mapStateToProps)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
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
