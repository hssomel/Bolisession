import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import UniversalFeed from '../components/UniversalFeed';
import HomeFeedHeader from '../components/HomeFeedHeader';

export default function HomeScreen(props) {
  // Initial State
  const [thisUser, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Event Handlers
  useEffect(() => {
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
              ListHeaderComponent={<HomeFeedHeader user={thisUser} />}
            />
          </View>
        )}
      </View>
    </View>
  );
}
