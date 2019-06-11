import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import firebase from 'react-native-firebase';

export default function HomeScreen(props) {
  const signOut = () => {
    firebase.auth().signOut();
    console.log('Signed Out !');
    props.navigation.navigate('phone');
  };

  const addDocument = (db) => {
    // [START add_document]
    // Add a new document with a generated id.
    let addDoc = db.collection('cities').add({
      name: 'Tokyo',
      country: 'Japan'
    }).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
    // [END add_document]

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <Text style={styles.text}>This will be your future feed!</Text>
      <Button title="Sign Out" color="red" onPress={signOut} />
    </View>
  );
}

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
