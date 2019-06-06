import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import firebase from 'react-native-firebase';

class HomeScreen extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('feedScreen loaded');
  }

  signOut = () => {
    firebase.auth().signOut();
    console.log('Signed Out !');
    this.props.navigation.navigate('phone');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome!</Text>
        <Text style={styles.text}>This will be your future feed!</Text>
        <Button title="Sign Out" color="red" onPress={this.signOut} />
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'chartreuse',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
