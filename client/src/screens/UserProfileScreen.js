import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import firebase from 'react-native-firebase';
import Post from '../components/Post';

export default function UserProfileScreen(props) {
  // Initial State
  const [feedData, setFeedData] = useState([]);
  const [user, setUser] = useState(null);
  const [liked, setHasLiked] = useState(null);
  //Initial database references
  const postsRef = firebase.database().ref('posts/');
  const verifyRef = firebase
    .database()
    .ref('people/')
    .child('users');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      verifyRef
        .orderByChild('userID')
        .equalTo(user.uid)
        .once('value', snapshot => {
          setUser(user);
        });
    });
    console.log('useEffect triggered on UserProfileScreen onAuthStateChanged');

    return () => {
      if (unsubscribe) unsubscribe();
      console.log('listener unmounted from userProfile screen');
    };
  }, []);

  useEffect(() => {
    console.log('useEffect triggered by getItems()');
    getItems();
  }, [liked]);

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
      });
  };

  // function called when user likes a post
  const handleLikePress = (item, key) => {
    const userLikedRef = postsRef.child(key).child('usersLiked');

    userLikedRef
      .orderByChild('user_name')
      .equalTo(user.displayName)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          // means user has not liked post
          console.log('user has not liked post so we will like it');
          increaseLikeByOne(key);
          addUserToLikesArray(key);
          setHasLiked(true);
        } else {
          decreaseLikeByOne(key);
          removeUserFromLikesArray(key);
          console.log('user has aleady liked post');
          setHasLiked(false);
        }
      });
  };

  const increaseLikeByOne = key => {
    const increaseLikeRef = postsRef.child(key).child('likes');
    increaseLikeRef.transaction(current_value => {
      return (current_value || 0) + 1;
    });
  };

  const decreaseLikeByOne = key => {
    const decreaseLikeRef = postsRef.child(key).child('likes');
    decreaseLikeRef.transaction(current_value => {
      return (current_value || 0) - 1;
    });
  };

  const addUserToLikesArray = key => {
    const addUserRef = postsRef.child(key).child('usersLiked');
    addUserRef
      .push({
        user_name: user.displayName,
      })
      .then(data => {
        console.log('successfully added ');
      })
      .catch(error => {
        console.log('error ', error);
      });
  };

  const removeUserFromLikesArray = key => {
    const removeUserRef = postsRef
      .child(key)
      .child('usersLiked')
      .orderByChild('user_name')
      .equalTo(user.displayName);

    removeUserRef
      .remove()
      .then(data => {
        console.log('successfully removed ');
      })
      .catch(error => {
        console.log('error ', error);
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
          renderItem={({ item }) => (
            <Post item={item} user={user} handleLikePress={handleLikePress} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
