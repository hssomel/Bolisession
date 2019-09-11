import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import LoadingIndicator from '../components/LoadingIndicator';
import UserProfileFeedHeader from '../components/UserProfileFeedHeader';
import UserProfileFeed from '../components/UserProfileFeed';
import { getClientUserKey, getProfileData } from '../actions/authActions';

const UserProfileScreen = props => {
  // Initial State
  const [user, setUser] = useState(null);
  // userKey refers to non-admin firebase database key for locating Current User
  const [userKey, setUserKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // 'userData' object is user data stored in non-admin firebase database
  // The non-admin database contains redudant admin database data along with
  // data that cannot be stored in the admin database
  // for example user Biography is stored only in non-admin database
  const [userData, setUserData] = useState(null);

  const setFields = async user => {
    try {
      const key = await getClientUserKey(user);
      setUserKey(key);
      const profileData = await getProfileData(key);
      setUserData(profileData);
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
              ListHeaderComponent={
                <UserProfileFeedHeader
                  user={user}
                  userData={userData}
                  userKey={userKey}
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
