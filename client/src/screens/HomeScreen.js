import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import UniversalFeed from '../components/UniversalFeed';
import HomeFeedHeader from '../components/HomeFeedHeader';

export default function HomeScreen(props) {
  // Initial State
  const [thisUser, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Firebase Reference
  const postsRef = firebase.database().ref('posts/');
  // Event Handlers
  const writeUserData = tweet => {
    postsRef
      .push({
        text: tweet,
        username: thisUser.displayName,
        userPhoto: thisUser.photoURL,
        likes: 0,
        comments: 0,
        retweets: 0,
        usersLiked: {},
      })
      .then(data => {
        console.log('data ', data);
      })
      .catch(error => {
        console.log('error ', error);
      });
  };

  useEffect(() => {
    console.log('mounted to home screen');
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setIsLoaded(true);
      } else {
        setUser(null);
        signOut();
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
      console.log('listener unmounted from HomeScreen');
    };
  }, []);

  const signOut = () => {
    firebase.auth().signOut();
    console.log('Signed Out !');
    props.navigation.navigate('phone');
  };

  return (
    <View>
      <View>
        {!isLoaded && (
          <View style={{ justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="orangered" />
          </View>
        )}
        {isLoaded && (
          <View>
            <UniversalFeed
              user={thisUser}
              ListHeaderComponent={
                <HomeFeedHeader user={thisUser} writeUserData={writeUserData} />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
