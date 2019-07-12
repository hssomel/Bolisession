import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import ProfileFeedHeader from '../components/ProfileFeedHeader';
import UserProfileFeed from '../components/UserProfileFeed';

export default function UserProfileScreen(props) {
  // Initial State
  const [thisUser, setUser] = useState(null);
  const [itemUser] = useState(props.navigation.getParam('item', null));
  const [isLoaded, setIsLoaded] = useState(false);
  //Initial database references

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setIsLoaded(true);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <View>
      <View>
        {!isLoaded && (
          <View style={{ justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="orangered" />
          </View>
        )}
        {isLoaded && (
          <View>
            <UserProfileFeed
              itemUser={itemUser}
              ListHeaderComponent={
                <ProfileFeedHeader itemUser={itemUser} user={thisUser} />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
