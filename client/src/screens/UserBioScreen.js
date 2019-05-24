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
  // Event Handlers

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Image
          source={require('../assets/images/bhangra.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>Tell us about yourself</Text>
      <Text style={styles.text1}>
        What makes you unique? Write a couple lines for your bio.
      </Text>
      <TextInput
        placeholder="Your bio"
        style={styles.textInput}
        onChangeText={input => setBio(input)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
    marginLeft: '4%',
  },
  container1: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: '4%',
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
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    fontSize: 20,
    width: '90%',
    paddingBottom: '-1%',
    marginTop: '4%',
  },
  image: {
    height: 60,
    width: 60,
    marginTop: '1%',
  },
});
