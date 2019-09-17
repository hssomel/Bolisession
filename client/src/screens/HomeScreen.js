import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import PostsFeed from '../components/PostsFeed';
import HomeFeedHeader from '../components/HomeFeedHeader';

const HomeScreen = props => {
  // Initial State
  const [user] = useState(props.navigation.getParam('user', null));
  const [isLoaded, setIsLoaded] = useState(null);

  useEffect(() => {
    console.log('mounted to home screen');
    if (user) {
      setIsLoaded(true);
    }
    return () => {
      console.log('unmounted from the home screen');
    };
  }, [user]);

  return (
    <View>
      <View>
        {!isLoaded ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="orangered" />
          </View>
        ) : (
          <View>
            <PostsFeed
              user={user}
              ListHeaderComponent={<HomeFeedHeader user={user} />}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
