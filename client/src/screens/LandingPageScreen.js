import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

const LandingPageScreen = props => {
  //Event Handlers
  const handleSignUpPress = () => {
    props.navigation.navigate('phone');
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewOne}>
        <Video
          source={require('../assets/videos/sample1.mp4')}
          ref={ref => {
            player = ref;
          }}
          repeat={true}
          style={styles.backgroundVideo}
          resizeMode={'cover'}
        />
        <Text style={styles.text}>Connect with the</Text>
        <Text style={styles.text1}>Bhangra Community</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingPageScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
    alignContent: 'center',
  },
  viewOne: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1.25,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '8%',
  },
  text1: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginBottom: '25%',
  },
  button: {
    width: '80%',
    backgroundColor: 'orangered',
    borderRadius: 32,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: '90%',
    paddingVertical: 11,
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
