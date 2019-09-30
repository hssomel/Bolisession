import React, { useState, useEffect } from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkIfFollowing } from '../actions/userProfileActions';

const FollowSwitch = ({ profilekey, user, handleFollowSwitchChange }) => {
  const { username } = user;
  // Initial State
  const [switchValue, setSwitchValue] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  // Event Handlers
  const setInitialValue = async (key, name) => {
    const isFollowing = await checkIfFollowing(key, name);
    const value = isFollowing ? true : false;
    setSwitchValue(value);
    setIsLoaded(true);
  };

  const handleSwitchChange = value => {
    setSwitchValue(value);
    handleFollowSwitchChange(value);
  };

  useEffect(() => {
    setInitialValue(profilekey, username);
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

FollowSwitch.propTypes = {
  user: PropTypes.object.isRequired,
  profilekey: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profilekey: state.profile.profilekey,
});

export default connect(mapStateToProps)(FollowSwitch);
