import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Video from 'react-native-video';
import firebase from 'react-native-firebase';
import GradientButton from '../../components/GradientButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import {
  confirmUserinFireBase,
  checkForProfileFields,
} from '../../actions/Authentication/authActions';

const { width } = Dimensions.get('window');

const LandingPageScreen = props => {
  // Initial State
  const [isLoaded, setIsLoaded] = useState(false);
  // Event Handlers
  const handleSignUpPress = () => {
    props.navigation.navigate('phone');
  };

  const recheckForUser = async user => {
    try {
      const doesExist = await confirmUserinFireBase(user);
      if (doesExist) {
        checkForProfileFields(user, props);
      } else {
        // user does not exist in secondary database
        setIsLoaded(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log('mounted to LandingPageScreen');
      if (user) {
        console.log('initial user', user);
        // checking to see if user exists in secondary (non-admin) database
        recheckForUser(user);
      } else {
        setIsLoaded(true);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
      console.log('unmounted from Landing Page');
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoaded ? (
        <View style={styles.container}>
          <Video
            source={require('../../assets/videos/sample1.mp4')}
            ref={ref => {
              player = ref;
            }}
            repeat={true}
            style={styles.backgroundVideo}
            resizeMode={'cover'}
          />
          <View style={styles.viewOne}>
            <Text style={styles.text}>Connect with the</Text>
            <Text style={styles.text1}>Bhangra Community</Text>
          </View>
          <View style={styles.viewTwo}>
            <GradientButton
              title="Sign in with phone number"
              onPress={handleSignUpPress}
            />
          </View>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </SafeAreaView>
  );
};

export default LandingPageScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  viewOne: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width,
    flex: 4,
    marginTop: '10%',
  },
  viewTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width,
    flex: 1,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'white',
  },
  text1: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'white',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
