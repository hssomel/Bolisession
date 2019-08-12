import React, { useState, useEffect } from 'react';
import { View, Text, Switch } from 'react-native';
import {
  increaseFollowingList,
  decreaseFollowingList,
  increaseFollowerList,
  decreaseFollowersList,
} from '../actions/userProfileActions';
import firebase from 'react-native-firebase';

const ToggleSwitch = props => {
  const { userKey, otherUserKey, otherUserData, user } = props;
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
      decreaseFollowingList(userKey, otherUserData.username);
      decreaseFollowersList(otherUserKey, user.displayName);
    } else {
      increaseFollowingList(userKey, otherUserData.username);
      increaseFollowerList(otherUserKey, user.displayName);
    }
  };

  useEffect(() => {
    initialToggleSwitchValue(userKey, otherUserData);
  }, []);

  return (
    <View>
      {isLoaded && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Switch
            onValueChange={toggleSwitch}
            value={switchValue}
            thumbColor={'orangered'}
          />
          <Text
            style={{ fontSize: 18, color: 'orangered', fontWeight: 'bold' }}
          >
            Follow
          </Text>
        </View>
      )}
    </View>
  );
};

export default ToggleSwitch;
