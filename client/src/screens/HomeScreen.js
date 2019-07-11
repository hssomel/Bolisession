import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import UniversalFeed from '../components/UniversalFeed';
import HomeFeedHeader from '../components/HomeFeedHeader';

export default function HomeScreen(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
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
      <UniversalFeed ListHeaderComponent={HomeFeedHeader} />
    </View>
  );
}
