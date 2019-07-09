import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import UniversalFeed from '../components/UniversalFeed';
import HomeFeedHeader from '../components/HomeFeedHeader';

export default function HomeScreen(props) {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(
    props.navigation.getParam('modalOn', false),
  );

  const verifyRef = firebase
    .database()
    .ref('people/')
    .child('users');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        verifyRef
          .orderByChild('userID')
          .equalTo(user.uid)
          .once('value', snapshot => {
            if (!snapshot.val()) {
              signOut();
            }
          });
      } else {
        setUser(null);
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
      {!modalOpen && <UniversalFeed ListHeaderComponent={HomeFeedHeader} />}
      {/* <Icon name="md-globe" size={30} /> */}
    </View>
  );
}
