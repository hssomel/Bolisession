import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import UniversalFeed from '../components/UniversalFeed';
import HomeFeedHeader from '../components/HomeFeedHeader';

export default function HomeScreen(props) {
  // Initial State
  const [user] = useState(props.navigation.getParam('user', null));
  const [isLoaded, setIsLoaded] = useState(false);
  // Firebase Reference
  const postsRef = firebase.database().ref('posts/');
  // Event Handlers
  const writeUserData = tweet => {
    postsRef
      .push({
        text: tweet,
        username: user.displayName,
        userPhoto: user.photoURL,
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

    if (user) {
      setIsLoaded(true);
    }
  }, [user]);

  return (
    <View>
      <View>
        {!isLoaded ? (
          <View style={{ justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="orangered" />
          </View>
        ) : (
          <View>
            <UniversalFeed
              user={user}
              ListHeaderComponent={
                <HomeFeedHeader user={user} writeUserData={writeUserData} />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
