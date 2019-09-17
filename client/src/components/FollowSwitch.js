import React, { useState, useEffect } from 'react';
import { View, Text, Switch } from 'react-native';
import { checkIfFollowing } from '../actions/userProfileActions';

const FollowSwitch = props => {
  const { userKey, username, toggleFollowSwitch } = props;
  // Initial State
  const [switchValue, setSwitchValue] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  // Event Handlers
  const initialToggleSwitchValue = async (key, name) => {
    const isFollowing = await checkIfFollowing(key, name);
    const value = isFollowing ? true : false;
    setSwitchValue(value);
    setIsLoaded(true);
  };

  const handleSwitchChange = value => {
    setSwitchValue(value);
    toggleFollowSwitch(value);
  };

  useEffect(() => {
    initialToggleSwitchValue(userKey, username);
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
            onValueChange={handleSwitchChange}
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

export default FollowSwitch;
