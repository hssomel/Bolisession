import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import firebase from 'react-native-firebase';
import LoadingIndicator from './LoadingIndicator';
import Post from './Post';

const UserProfileFeed = props => {
  const { ListHeaderComponent, name, user } = props;
  // Initial State
  const [feedData, setFeedData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // Firebase References
  const postsRef = firebase.database().ref('posts/');
  // Event Handlers
  const getPostsbyUser = async name => {
    try {
      const userPosts = [];
      const snapshot = await postsRef
        .orderByChild('username')
        .equalTo(name)
        .once('value');
      snapshot.forEach(data => {
        userPosts.push(data);
      });
      setFeedData(userPosts.reverse());
      setIsLoaded(true);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getPostsbyUser(name);
  }, []);

  return (
    <SafeAreaView>
      <View style={{ justifyContent: 'flex-start' }}>
        {!isLoaded && <LoadingIndicator />}
        <FlatList
          data={feedData}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <Post item={item} user={user} />}
          ListHeaderComponent={ListHeaderComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserProfileFeed;
