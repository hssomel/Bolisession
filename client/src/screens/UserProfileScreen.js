import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import LoadingIndicator from '../components/LoadingIndicator';
import UserProfileHeader from '../components/UserProfileHeader';
import UserProfileFeed from '../components/UserProfileFeed';
import OtherUserProfileHeader from '../components/OtherUserProfileHeader';
import {
  getClientUserKey,
  getProfileData,
  getOtherPersonsKey,
} from '../actions/Authentication/authActions';

const UserProfileScreen = props => {
  // Initial State
  const [user, setUser] = useState(null);
  // userKey refers to non-admin firebase database key for locating Current User
  const [userKey, setUserKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // 'userData' object is all the profile data fields stored in non-admin database
  const [userData, setUserData] = useState(null);
  // True or False param passed in indicating if user has accessed this route by
  // clicking on their own avatar or someone else's in the universal post feed
  const [sameUser] = useState(props.navigation.getParam('sameUser', true));
  // Username of whoever's avatar user clicked on in the universal post feed
  const [otherUser] = useState(props.navigation.getParam('username', null));
  const [otherUserKey, setOtherUserKey] = useState(null);
  const [otherUserData, setOtherUserData] = useState(null);

  // Event Handlers
  const setFields = async user => {
    try {
      const key = await getClientUserKey(user);
      setUserKey(key);
      const profileData = await getProfileData(key);
      setUserData(profileData);
      if (!sameUser) {
        const key2 = await getOtherPersonsKey(otherUser);
        setOtherUserKey(key2);
        const profileData2 = await getProfileData(key2);
        setOtherUserData(profileData2);
      }
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

  return (
    <View>
      <View>
        {!isLoaded && <LoadingIndicator />}
        {isLoaded && (
          <View>
            <UserProfileFeed
              name={sameUser ? userData.username : otherUserData.username}
              user={user}
              ListHeaderComponent={
                sameUser ? (
                  <UserProfileHeader
                    user={user}
                    userData={userData}
                    userKey={userKey}
                  />
                ) : (
                  <OtherUserProfileHeader
                    user={user}
                    userKey={userKey}
                    otherUserData={otherUserData}
                    otherUserKey={otherUserKey}
                  />
                )
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default UserProfileScreen;
