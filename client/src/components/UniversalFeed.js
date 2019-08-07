import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import firebase from 'react-native-firebase';
import Post from './Post';

export default function UniversalFeed(props) {
  const { ListHeaderComponent, user } = props;
  // Initial State
  const [feedData, setFeedData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(null);
  // Firebase References
  const postsRef = firebase.database().ref('posts/');
  // Event Handlers

  const getAllPosts = () => {
    const twitPosts = [];
    const query = postsRef.limitToLast(100);
    query
      .once('value', snapshot => {
        snapshot.forEach(data => {
          twitPosts.push(data);
        });
      })
      .then(() => {
        setFeedData(twitPosts.reverse());
        setIsLoaded(true);
      });
  };

  const updatePosts = () => {
    postsRef.on('child_added', () => {
      getAllPosts();
    });
  };

  useEffect(() => {
    getAllPosts();
    updatePosts();
    return () => {
      postsRef.off();
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={{ justifyContent: 'flex-start' }}>
        {!isLoaded ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="orangered" />
          </View>
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
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
