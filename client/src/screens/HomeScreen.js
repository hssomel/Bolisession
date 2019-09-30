import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { NavigationEvents } from 'react-navigation';
import PostsFeed from '../components/PostsFeed';
import HomeFeedHeader from '../components/HomeFeedHeader';
import LoadingIndicator from '../components/LoadingIndicator';
import { getAllPosts } from '../actions/postActions';

const HomeScreen = ({ getAllPosts }) => {
  // Firebase References
  const postsRef = firebase.database().ref('posts/');
  // Initial State
  const [isLoaded, setIsLoaded] = useState(null);
  const [isFocused, setFocused] = useState(null);
  // Event Handlers
  const updatePosts = () => {
    postsRef.on('child_added', () => {
      getAllPosts();
    });
  };

  useEffect(() => {
    updatePosts();
    setIsLoaded(true);
    return () => {
      postsRef.off();
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      getAllPosts();
    }
  }, [isFocused]);

  return (
    <View>
      {!isLoaded ? (
        <LoadingIndicator />
      ) : (
        <View style={{ justifyContent: 'center' }}>
          <NavigationEvents
            onDidFocus={() => setFocused(true)}
            onDidBlur={() => setFocused(false)}
          />
          <PostsFeed ListHeaderComponent={<HomeFeedHeader />} />
        </View>
      )}
    </View>
  );
};

HomeScreen.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { getAllPosts },
)(HomeScreen);
