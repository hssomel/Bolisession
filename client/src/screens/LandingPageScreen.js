import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';

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
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['red', 'orange'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          title="Sign in with phone number"
          titleStyle={styles.text2}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
    alignContent: 'center',
  },
  viewOne: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1.25,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '20%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 55,
    width: '85%',
    borderRadius: 10,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'white',
    marginTop: '8%',
  },
  text1: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'white',
    marginBottom: '25%',
  },
  text2: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
