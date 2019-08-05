import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import UniversalFeed from '../components/UniversalFeed';
import HomeFeedHeader from '../components/HomeFeedHeader';

export default function HomeScreen(props) {
  // Initial State
  const [user] = useState(props.navigation.getParam('user', null));
  const [isLoaded, setIsLoaded] = useState(false);

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
              ListHeaderComponent={<HomeFeedHeader user={user} />}
            />
          </View>
        )}
      </View>
    </View>
  );
}
