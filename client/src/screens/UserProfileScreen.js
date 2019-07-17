import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import ProfileFeedHeader from '../components/ProfileFeedHeader';
import UserProfileFeed from '../components/UserProfileFeed';
import {
  increaseFollowingList,
  decreaseFollowingList,
  increaseFollowerList,
  decreaseFollowersList,
} from '../actions/userProfileActions';

export default function UserProfileScreen(props) {
  // Initial State
  const [thisUser, setUser] = useState(null);
  const [postData] = useState(props.navigation.getParam('item', null));
  const [UserOfPostName] = useState(props.navigation.getParam('name', null));
  const [isLoaded, setIsLoaded] = useState(false);
  const [switchValue, setSwitchValue] = useState(null);
  const [currentUserKey, setCurrentUserParentKey] = useState(null);
  const [postUserParentKey, setPostUserParentKey] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [postCreatorData, setPostCreatorData] = useState(null);
  // Firebase references
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users');

  // Event Handlers
  const initialToggleSwitchValue = key => {
    usersRef
      .child(key)
      .child('following')
      .orderByChild('user_name')
      .equalTo(UserOfPostName)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          setSwitchValue(false);
        } else {
          setSwitchValue(true);
        }
      });
  };

  const toggleSwitch = value => {
    setSwitchValue(value);
    if (!value) {
      decreaseFollowingList(currentUserKey, UserOfPostName);
      decreaseFollowersList(postUserParentKey, thisUser.displayName);
    } else {
      increaseFollowingList(currentUserKey, UserOfPostName);
      increaseFollowerList(postUserParentKey, thisUser.displayName);
    }
  };

  const getCurrentUserParentKey = user => {
    return new Promise((resolve, reject) => {
      usersRef
        .orderByChild('userID')
        .equalTo(user.uid)
        .once('value', snapshot => {
          snapshot.forEach(data => {
            console.log('current user parent key data', data);
            setCurrentUserData(data._value);
            setCurrentUserParentKey(data.key);
            resolve(data.key);
          });
        });
    });
  };

  const getPostUserParentKey = () => {
    return new Promise((resolve, reject) => {
      usersRef
        .orderByChild('username')
        .equalTo(UserOfPostName)
        .once('value', snapshot => {
          snapshot.forEach(data => {
            setPostCreatorData(data._value);
            setPostUserParentKey(data.key);
            resolve();
          });
        });
    });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      getCurrentUserParentKey(user)
        .then(res => {
          if (postData) {
            initialToggleSwitchValue(res);
            getPostUserParentKey()
              .then(() => {
                setIsLoaded(true);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            setIsLoaded(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
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
              postData={postData}
              ListHeaderComponent={
                <ProfileFeedHeader
                  postData={postData}
                  user={thisUser}
                  toggleSwitch={toggleSwitch}
                  switchValue={switchValue}
                  postCreator={postCreatorData}
                  currentUser={currentUserData}
                />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
