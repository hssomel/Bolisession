import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import Video from 'react-native-video';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GradientButton from '../../components/GradientButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import {
  initializeUserCredentials,
  initializeProfileData,
} from '../../actions/authActions';

const { width, height } = Dimensions.get('window');

const LandingPageScreen = ({
  navigation,
  initializeProfileData,
  initializeUserCredentials,
}) => {
  // Initial State
  const [isLoaded, setIsLoaded] = useState(false);
  // Event Handlers
  const handleSignUpPress = () => {
    navigation.navigate('phone');
  };

  const checkIfUserExistsInDatabase = async user => {
    const key = await initializeUserCredentials(user);
    initializeProfileData(key, navigation);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        checkIfUserExistsInDatabase(user);
      } else {
        setIsLoaded(true);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
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
            <Text style={styles.text}>Bhangra Community</Text>
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

LandingPageScreen.propTypes = {
  initializeUserCredentials: PropTypes.func.isRequired,
  initializeProfileData: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { initializeProfileData, initializeUserCredentials },
)(LandingPageScreen);

const styles = StyleSheet.create({
  container: {
    height,
  },
  viewOne: {
    alignItems: 'center',
    marginTop: height * 0.08,
  },
  viewTwo: {
    width,
    position: 'absolute',
    bottom: 0,
    marginBottom: height * 0.08,
  },
  text: {
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
