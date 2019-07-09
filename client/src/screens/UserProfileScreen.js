import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import Post from '../components/Post';
import ProfileFeedHeader from '../components/ProfileFeedHeader';

export default function UserProfileScreen(props) {
  // Initial State
  const [feedData, setFeedData] = useState([]);
  const [user, setUser] = useState(null);
  //Initial database references
  const postsRef = firebase.database().ref('posts/');
  const verifyRef = firebase
    .database()
    .ref('people/')
    .child('users');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      console.log('we have reached the userProfileScreen');
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  });

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
          console.log(data);
        });
      })
      .then(() => {
        setFeedData(twitPosts.reverse());
      });
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={{ justifyContent: 'flex-start' }}>
        <FlatList
          data={feedData}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <Post item={item} user={user} />}
          ListHeaderComponent={<ProfileFeedHeader user={user} />}
        />
      </View>
    </SafeAreaView>
  );
}
