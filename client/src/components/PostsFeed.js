import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingIndicator from './LoadingIndicator';
import Post from './Post';

const PostsFeed = ({
  ListHeaderComponent,
  posts,
  postsByProfile,
  profileMode,
}) => {
  // Initial State
  const [isLoaded, setIsLoaded] = useState(null);
  // Event Handlers
  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={{ justifyContent: 'flex-start' }}>
        {!isLoaded ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            data={profileMode ? postsByProfile : posts}
            keyExtractor={item => item.key}
            renderItem={({ item }) => (
              <Post data={item._value} postkey={item.key} />
            )}
            ListHeaderComponent={ListHeaderComponent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

PostsFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  posts: state.post.posts,
  postsByProfile: state.post.postsByProfile,
});

export default connect(mapStateToProps)(PostsFeed);
