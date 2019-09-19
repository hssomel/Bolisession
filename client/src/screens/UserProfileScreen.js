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

const UserProfileScreen = ({ navigation }) => {
  // Boolean value passed in indicating if client accessed screen by
  // clicking on their own avatar or of another user
  const [sameUser] = useState(navigation.getParam('sameUser', true));
  // Username of the profile the client accessed
  const [otherUser] = useState(navigation.getParam('username', null));
  // Initial State
  const [user, setUser] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
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
