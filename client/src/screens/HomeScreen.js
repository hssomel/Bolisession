import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import UniversalFeed from '../components/UniversalFeed';
import HomeFeedHeader from '../components/HomeFeedHeader';

export default function HomeScreen(props) {
  const [modalOpen, setModalOpen] = useState(
    props.navigation.getParam('modalOn', false),
  );

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
          if (!snapshot.val()) {
            signOut();
          }
        });
    });

    return () => {
      if (unsubscribe) unsubscribe();
      console.log('listener unmounted from HomeScreen');
    };
  });

  const signOut = () => {
    firebase.auth().signOut();
    console.log('Signed Out !');
    props.navigation.navigate('phone');
  };

  const writeUserData = () => {
    firebase
      .database()
      .ref('posts/')
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
        //success callback
        console.log('data ', data);
      })
      .catch(error => {
        //error callback
        console.log('error ', error);
      });
  };

  return (
    <View>
      {!modalOpen && <UniversalFeed ListHeaderComponent={HomeFeedHeader} />}
      {/* <Icon name="md-globe" size={30} /> */}
    </View>
  );
}
