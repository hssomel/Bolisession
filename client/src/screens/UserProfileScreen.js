import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import ProfileFeedHeader from '../components/ProfileFeedHeader';
import UserProfileFeed from '../components/UserProfileFeed';

export default function UserProfileScreen(props) {
  // Initial State
  const [thisUser, setUser] = useState(null);
  const [UserOfPost] = useState(props.navigation.getParam('item', null));
  const [isLoaded, setIsLoaded] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [currentUserKey, setCurrentUserParentKey] = useState(null);
  // Firebase references
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users');

  // Event Handlers
  const toggleSwitch = value => {
    setSwitchValue(value);
  };

  const getCurrentUserParentKey = user => {
    usersRef
      .orderByChild('userID')
      .equalTo(user.uid)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          setCurrentUserParentKey(data.key);
          console.log(data.key);
        });
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      getCurrentUserParentKey(user);
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
              UserOfPost={UserOfPost}
              ListHeaderComponent={
                <ProfileFeedHeader
                  UserOfPost={UserOfPost}
                  user={thisUser}
                  toggleSwitch={toggleSwitch}
                  switchValue={switchValue}
                />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
