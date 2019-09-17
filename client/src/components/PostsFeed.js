import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import firebase from 'react-native-firebase';
import LoadingIndicator from './LoadingIndicator';
import Post from './Post';

const PostsFeed = props => {
  const { ListHeaderComponent, user, name } = props;
  // Initial State
  const [feedData, setFeedData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(null);
  // Firebase References
  const postsRef = firebase.database().ref('posts/');
  // Event Handlers
  const getPosts = async username => {
    try {
      let snapshot;
      const posts = [];
      if (!username) {
        // We are not on a user's profile page
        // So we want all posts
        snapshot = await postsRef.limitToLast(100).once('value');
      } else {
        // We want posts by the name prop passed in
        snapshot = await postsRef
          .orderByChild('username')
          .equalTo(username)
          .once('value');
      }
      snapshot.forEach(data => {
        posts.push(data);
      });
      setFeedData(posts.reverse());
      setIsLoaded(true);
    } catch (err) {
      console.warn(err);
    }
  };

  const updatePosts = () => {
    postsRef.on('child_added', () => {
      getPosts(name);
    });
  };

  useEffect(() => {
    getPosts(name);
    updatePosts();
    return () => {
      postsRef.off();
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={{ justifyContent: 'flex-start' }}>
        {!isLoaded ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            data={feedData}
            keyExtractor={item => item.key}
            renderItem={({ item }) => <Post item={item} user={user} />}
            ListHeaderComponent={ListHeaderComponent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PostsFeed;
