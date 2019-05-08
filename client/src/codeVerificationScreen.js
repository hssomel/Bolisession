import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

class codeVerificationScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.buttonText1}>Login!!!!!!</Text>
      </View>
    );
  }
}

export default codeVerificationScreen;

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
