import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import LoadingIndicator from '../components/LoadingIndicator';
import OtherUserProfileFeedHeader from '../components/OtherUserProfileFeedHeader';
import UserProfileFeed from '../components/UserProfileFeed';
import {
  getClientUserKey,
  getOtherPersonsKey,
  getProfileData,
} from '../actions/authActions';

const OtherUserScreen = props => {
  // Initial State
  const [user, setUser] = useState(null);
  // userKey refers to non-admin firebase database key for locating Current User
  const [userKey, setUserKey] = useState(null);
  const [userData, setUserData] = useState(null);
  // 'otherUserData' exists when client accesses this screen by clicking
  // on the avatar of another user in the map screen
  // 'otherUserData' is null when client accesses this screen by clicking on
  // a user's avatar on universal feed displayed only on the home page
  const [otherUserData, setOtherUserData] = useState(
    props.navigation.getParam('item', null),
  );
  const [tweetData] = useState(props.navigation.getParam('tweet', null));
  const [isLoaded, setIsLoaded] = useState(false);
  const [otherUserKey, setOtherUserKey] = useState(
    props.navigation.getParam('key', null),
  );

  // Event Handlers
  const setFields = async user => {
    try {
      const key = await getClientUserKey(user);
      setUserKey(key);
      const profileData = await getProfileData(key);
      setUserData(profileData);
      if (!otherUserData) {
        // client accessed route through home feed
        const otherPersonsKey = await getOtherPersonsKey(tweetData);
        setOtherUserKey(otherPersonsKey);
        const otherPersonsData = await getProfileData(otherPersonsKey);
        setOtherUserData(otherPersonsData);
        setIsLoaded(true);
      } else {
        setIsLoaded(true);
      }
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

  return (
    <View>
      <View>
        {!isLoaded && <LoadingIndicator />}
        {isLoaded && (
          <View>
            <UserProfileFeed
              otherUserData={otherUserData}
              ListHeaderComponent={
                <OtherUserProfileFeedHeader
                  user={user}
                  userKey={userKey}
                  otherUserData={otherUserData}
                  otherUserKey={otherUserKey}
                />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default OtherUserScreen;
