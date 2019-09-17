import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import LoadingIndicator from '../components/LoadingIndicator';
import ProfileHeader from '../components/ProfileHeader';
import PostsFeed from '../components/PostsFeed';
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
  // True or False param passed in indicating if user has accessed this route by
  // clicking on their own avatar or someone else's in the universal post feed
  const [sameUser] = useState(props.navigation.getParam('sameUser', true));
  // Username of whoever's avatar the client clicked on in the universal post feed
  const [otherUser] = useState(props.navigation.getParam('username', null));
  const [otherUserKey, setOtherUserKey] = useState(null);
  // Profile Data will either be of the client's or of another user if client
  // accessed the profile screen by clicking on another user's avatar
  const [profileData, setProfileData] = useState(null);

  // Event Handlers
  const setFields = async user => {
    const key = await getClientUserKey(user);
    setUserKey(key);
    if (sameUser) {
      // Client clicked on their own profile
      const data = await getProfileData(key);
      setProfileData(data);
    } else {
      // Client clicked on another user's profile
      const key2 = await getOtherPersonsKey(otherUser);
      setOtherUserKey(key2);
      const data = await getProfileData(key2);
      setProfileData(data);
    }
    setIsLoaded(true);
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
            <PostsFeed
              name={profileData.username}
              user={user}
              ListHeaderComponent={
                <ProfileHeader
                  user={user}
                  profileData={profileData}
                  userKey={userKey}
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

export default UserProfileScreen;
