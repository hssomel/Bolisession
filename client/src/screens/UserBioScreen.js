import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';

export default function ProfilePhotoScreen(props) {
  // Initial State
  const [bio, setBio] = useState('');
  const x = 120 - bio.length;
  // Event Handlers

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/bhangra.png')}
        style={styles.image}
      />

      <Text style={styles.text}>Describe yourself</Text>
      <Text style={styles.text1}>What makes you unique?</Text>
      <Text style={styles.text2}>Write a couple lines for your bio.</Text>
      <TextInput
        placeholder="Your bio"
        style={styles.textInput}
        onChangeText={input => setBio(input)}
      />
      <Text style={styles.text3}>{x}</Text>
    </SafeAreaView>
  );
}

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
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '8%',
  },
  text1: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    color: 'grey',
    marginTop: '3%',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    color: 'grey',
    marginTop: '1%',
  },
  text3: {
    fontSize: 17,
    fontFamily: 'Gill Sans',
    color: 'grey',
    marginTop: '1%',
    marginLeft: '75%',
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    fontSize: 20,
    width: '90%',
    paddingBottom: '-1%',
    marginTop: '6%',
  },
  image: {
    height: 60,
    width: 60,
    marginTop: '2%',
  },
});
