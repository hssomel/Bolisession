import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import Post from './Post';

export default function UserProfileFeed(props) {
  const { ListHeaderComponent, UserOfPost } = props;
  // Initial State
  const [feedData, setFeedData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [thisUser, setUser] = useState(null);
  // Firebase References
  const postsRef = firebase.database().ref('posts/');
  // Event Handlers
  const renderData = twitPosts => {
    return new Promise((resolve, reject) => {
      setFeedData(twitPosts.reverse());
      resolve();
    });
  };

  const getItemsbyUser = name => {
    const userPosts = [];
    postsRef
      .orderByChild('username')
      .equalTo(name)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          userPosts.push(data);
        });
      })
      .then(() => {
        renderData(userPosts)
          .then(() => {
            setIsLoaded(true);
          })
          .catch(err => {
            console.log(err);
          });
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (!UserOfPost) {
        // client used navigation icon
        getItemsbyUser(user.displayName);
      } else {
        getItemsbyUser(UserOfPost._value.username);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

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
