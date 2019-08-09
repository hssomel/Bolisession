import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import LoadingIndicator from '../components/LoadingIndicator';
import ProfileFeedHeader from '../components/ProfileFeedHeader';
import UserProfileFeed from '../components/UserProfileFeed';
import {
  increaseFollowingList,
  decreaseFollowingList,
  increaseFollowerList,
  decreaseFollowersList,
} from '../actions/userProfileActions';
import { getCurrentUserKey } from '../actions/authActions';

export default function UserProfileScreen(props) {
  // Initial State
  const [user, setUser] = useState(null);
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
      decreaseFollowersList(postUserParentKey, user.displayName);
    } else {
      increaseFollowingList(currentUserKey, UserOfPostName);
      increaseFollowerList(postUserParentKey, user.displayName);
    }
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
      getCurrentUserKey(user, setCurrentUserData, setCurrentUserParentKey)
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
        {!isLoaded && <LoadingIndicator />}
        {isLoaded && (
          <View>
            <UserProfileFeed
              postData={postData}
              ListHeaderComponent={
                <ProfileFeedHeader
                  postData={postData}
                  user={user}
                  toggleSwitch={toggleSwitch}
                  switchValue={switchValue}
                  postCreator={postCreatorData}
                  currentUser={currentUserData}
                  currentUserKey={currentUserKey}
                  postUserParentKey={postUserParentKey}
                />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
