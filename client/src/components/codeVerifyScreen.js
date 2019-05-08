import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class codeVerifyScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.buttonText1}>Please enter your login code</Text>
      </View>
    );
  }
}

export default codeVerifyScreen;

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

  buttonText1: {
    color: 'red',
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
