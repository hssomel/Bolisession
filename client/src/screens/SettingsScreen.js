import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import LoadingIndicator from '../components/LoadingIndicator';
import { getClientUserKey } from '../actions/Authentication/authActions';

const SettingsScreen = props => {
  // Intial State
  const [user, setUser] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  // Firebase References
  const postsRef = firebase.database().ref('posts/');
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users/');

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
    console.log('mounted to settings screen');
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setFields(user);
    });

    return () => {
      if (unsubscribe) unsubscribe();
      console.log('unmounted from settings screen');
    };
  }, []);

  const removeFromUsersDB = () => {
    usersRef
      .orderByChild('username')
      .equalTo(user.displayName)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          const removeRef = usersRef.child(data.key);
          removeRef
            .remove()
            .then(() => {
              removeFromPostsDB();
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
  };

  const removeFromPostsDB = () => {
    postsRef
      .orderByChild('username')
      .equalTo(user.displayName)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          const removeRef = postsRef.child(data.key);
          removeRef
            .remove()
            .then(() => {})
            .catch(err => {
              console.log(err);
            });
        });
        deleteUser();
      });
  };

  const deleteUser = () => {
    user
      .delete()
      .then(() => {
        props.navigation.navigate('phone');
      })
      .catch(err => {
        console.log(err);
        signOut();
      });
  };

  const signOut = () => {
    firebase.auth().signOut();
    console.log('Signed Out !');
    props.navigation.navigate('phone');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={removeFromUsersDB}>
        <Text style={styles.ButtonText}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.ButtonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.ButtonText}>Edit Profile Video</Text>
      </TouchableOpacity>
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
