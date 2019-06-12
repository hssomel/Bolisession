import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import firebase from 'react-native-firebase';

export default function HomeScreen(props) {
  // Initial State
  const [tweet, setTweet] = useState('');

  const signOut = () => {
    firebase.auth().signOut();
    console.log('Signed Out !');
    props.navigation.navigate('phone');
  };

  const writeUserData = () => {
    firebase
      .database()
      .ref('posts/')
      .push({
        text: tweet,
      })
      .then(data => {
        //success callback
        console.log('data ', data);
      })
      .catch(error => {
        //error callback
        console.log('error ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <Text style={styles.text}>This will be your future feed!</Text>
      <Button
        title="Sign Out"
        color="red"
        onPress={signOut}
        style={styles.button}
      />
      <TextInput
        placeholder="Body of tweet"
        style={styles.textInput}
        onChangeText={input => setTweet(input)}
      />
      <Button
        title="Upload data"
        color="red"
        onPress={writeUserData}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'chartreuse',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  button: {
    marginTop: '8%',
  },
  textInput: {
    marginTop: '15%',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    fontSize: 20,
    width: '83%',
    paddingBottom: '-1%',
  },
});
