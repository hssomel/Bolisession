import React, { useState, useEffect } from 'react';
import { View, Text, Switch } from 'react-native';
import firebase from 'react-native-firebase';
import {
  increaseFollowingList,
  decreaseFollowingList,
  increaseFollowerList,
  decreaseFollowersList,
} from '../actions/userProfileActions';

const ToggleSwitch = props => {
  const {
    userKey,
    otherUserKey,
    profileData,
    user,
    followers,
    setFollowersCount,
  } = props;
  // Initial State
  const [switchValue, setSwitchValue] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  // Firebase references
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users');

  // Event Handlers
  const initialToggleSwitchValue = (key, data) => {
    usersRef
      .child(key)
      .child('following')
      .orderByChild('user_name')
      .equalTo(data.username)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          setSwitchValue(false);
          setIsLoaded(true);
        } else {
          setSwitchValue(true);
          setIsLoaded(true);
        }
      });
  };

  const toggleSwitch = value => {
    setSwitchValue(value);
    if (!value) {
      decreaseFollowingList(userKey, profileData.username);
      decreaseFollowersList(otherUserKey, user.displayName);
      const counter = followers - 1;
      setFollowersCount(counter);
    } else {
      increaseFollowingList(userKey, profileData.username);
      increaseFollowerList(otherUserKey, user.displayName);
      const counter = followers + 1;
      setFollowersCount(counter);
    }
  };

  useEffect(() => {
    initialToggleSwitchValue(userKey, profileData);
  }, []);

  return (
    <View>
      {isLoaded && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          }}
        >
          <Switch
            onValueChange={toggleSwitch}
            value={switchValue}
            thumbColor={'orangered'}
          />
          <Text
            style={{
              fontSize: 18,
              color: 'orangered',
              fontWeight: 'bold',
              paddingLeft: 5,
              fontFamily: 'Roboto',
            }}
          >
            {switchValue ? 'Following' : 'Follow'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ToggleSwitch;
