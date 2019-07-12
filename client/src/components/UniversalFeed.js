import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import Post from '../components/Post';

import firebase from 'react-native-firebase';

export default function UniversalFeed(props) {
  const { ListHeaderComponent } = props;
  // Initial State
  const [feedData, setFeedData] = useState([]);
  const [thisUser, setUser] = useState(null); //
  const [isLoaded, setIsLoaded] = useState(false);
  // Firebase References
  const postsRef = firebase.database().ref('posts/');
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    getItems();
  }, []);

  // function called to get all posts
  const getItems = () => {
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

  return (
    <SafeAreaView>
      <View style={{ justifyContent: 'flex-start' }}>
        {!isLoaded && (
          <View style={{ justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="orangered" />
          </View>
        )}
        <FlatList
          data={feedData}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <Post item={item} user={thisUser} />}
          ListHeaderComponent={ListHeaderComponent}
        />
      </View>
    </SafeAreaView>
  );
}
