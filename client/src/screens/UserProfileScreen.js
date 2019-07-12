import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import Post from '../components/Post';
import ProfileFeedHeader from '../components/ProfileFeedHeader';

export default function UserProfileScreen(props) {
  // Initial State
  const [isLoaded, setIsLoaded] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [thisUser, setUser] = useState(null);
  const [itemUser, setItemUser] = useState(
    props.navigation.getParam('item', null),
  );
  const yolo = itemUser ? itemUser._value.username : thisUser.displayName;
  //Initial database references
  const postsRef = firebase.database().ref('posts/');
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users');

  // Event Handlers
  const renderData = twitPosts => {
    return new Promise((resolve, reject) => {
      setFeedData(twitPosts.reverse());
      resolve();
    });
  };

  const getItemsbyUser = name => {
    const twitPosts = [];
    const query = postsRef;
    query
      .orderByChild('username')
      .equalTo(name)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          console.log('succes', name);
          twitPosts.push(data);
        });
      })
      .then(() => {
        renderData(twitPosts)
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
      if (!itemUser) {
        getItemsbyUser(user.displayName);
        // means user clicked on their own avatar
        // usersRef
        //   .orderByChild('userID')
        //   .equalTo(user.uid)
        //   .once('value', snapshot => {
        //     snapshot.forEach(data => {
        //       setUser(usersRef.child(data.key));
        //       //WORK ON THIS
        //     });
        //   });
      } else {
        getItemsbyUser(itemUser._value.username);
        // usersRef
        //   .orderByChild('username')
        //   .equalTo(item._value.username)
        //   .once('value', snapshot => {
        //     snapshot.forEach(data => {
        //       setUser(usersRef.child(data.key));
        //     });
        //   });
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
        {isLoaded && (
          <FlatList
            data={feedData}
            keyExtractor={item => item.key}
            renderItem={({ item }) => <Post item={item} user={thisUser} />}
            ListHeaderComponent={ProfileFeedHeader}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
