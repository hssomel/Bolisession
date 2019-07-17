import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default function UserBioScreen(props) {
  // Initial State
  const [bio, setBio] = useState('');
  const [userKey] = useState(props.navigation.getParam('currentUserKey', null));
  const x = 120 - bio.length;
  // Firebase references
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users')
    .child(userKey);

  // Event Handlers
  const uploadBio = () => {
    usersRef
      .update({
        bio: bio,
      })
      .then(data => {
        console.log('successfully updated ', data);
        props.navigation.navigate('Home');
      })
      .catch(error => {
        console.log('error ', error);
      });
  };

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
      {bio.length > 2 && (
        <Button
          onPress={uploadBio}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['red', 'orange'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          title="APPLY CHANGES"
          fontSize={38}
        />
      )}
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
  buttonContainer: {
    marginTop: '15%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 50,
    width: '85%',
    borderRadius: 25,
  },
});
