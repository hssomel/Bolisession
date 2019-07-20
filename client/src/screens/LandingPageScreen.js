import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import firebase from 'react-native-firebase';
import GradientButton from '../components/GradientButton';

const LandingPageScreen = props => {
  //Event Handlers
  const handleSignUpPress = () => {
    props.navigation.navigate('phone');
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate('Dashboard');
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
      console.log('unmounted from Landing Page');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/videos/sample1.mp4')}
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
  );
};

export default LandingPageScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  viewOne: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    flex: 4,
    marginTop: '10%',
  },
  viewTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
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
