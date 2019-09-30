import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import ProfileHeader from '../components/ProfileHeader';
import PostsFeed from '../components/PostsFeed';
import {
  getPostsByProfile,
  setProfileOnScreen,
  clearProfile,
} from '../actions/postActions';

const UserProfileScreen = ({
  user,
  profile,
  postsByProfile,
  getPostsByProfile,
  setProfileOnScreen,
  clearProfile,
}) => {
  // Destructuring props
  const { username } = user;
  // Initial State
  const [isLoaded, setIsLoaded] = useState(false);
  // Event Handlers
  const setFields = async () => {
    if (!postsByProfile) {
      await getPostsByProfile(username);
    }
    if (!profile) {
      await setProfileOnScreen(user);
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    setFields();
    return () => {
      setIsLoaded(false);
      clearProfile();
    };
  }, []);

  return (
    <View>
      {!isLoaded ? (
        <LoadingIndicator />
      ) : (
        <View style={{ justifyContent: 'center' }}>
          <PostsFeed
            profileMode={true}
            ListHeaderComponent={<ProfileHeader />}
          />
        </View>
      )}
    </View>
  );
};

UserProfileScreen.propTypes = {
  user: PropTypes.object.isRequired,
  setProfileOnScreen: PropTypes.func.isRequired,
  getPostsByProfile: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile,
  postsByProfile: state.post.postsByProfile,
});

export default connect(
  mapStateToProps,
  { getPostsByProfile, setProfileOnScreen, clearProfile },
)(UserProfileScreen);
