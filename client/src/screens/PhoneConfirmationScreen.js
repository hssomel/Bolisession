import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, TextInput } from 'react-native';
import { Text, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

// Style
const { width } = Dimensions.get('window');
const pillHeight = 50;
const pillWidth = width * 0.9;
const pillFontSize = pillWidth / 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  titleText: {
    marginTop: 50,
    fontSize: 34,
    color: 'black',
  },
  textInput: {
    marginTop: 50,
    fontSize: pillFontSize,
    flex: 0.1,
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    width: '100%',
    paddingBottom: 0,
  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    borderRadius: 50,
    height: pillHeight,
    width: pillWidth,
    backgroundColor: 'orangered',
  },
  buttonTitle: {
    fontSize: pillFontSize,
  },
});

// Component
export default function PhoneConfirmationScreen(props) {
  // Initial State
  const [codeInput, setCodeInput] = useState('');
  const [country, setCountry] = useState({
    name: 'United States of America',
    alpha2Code: 'us',
    callingCode: 1,
  });

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(''); // TO DO integrate into error
  const [confirmResult, setConfirmResult] = useState(
    props.navigation.getParam('confirmResult', null),
  );

  // Event Handlers

  const handleSubmitButtonPress = () => {
    confirmCode();
  };

  const confirmCode = () => {
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          setMessage('Code Confirmed!');
          props.navigation.navigate('Create');
        })
        .catch(error => setMessage(error.message));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>My code is</Text>
      <TextInput
        placeholder="Verification code"
        style={styles.textInput}
        onChangeText={input => setCodeInput(input)}
      />
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Verify Code"
        onPress={handleSubmitButtonPress}
      />
      <Text style={{ marginTop: 10, fontSize: 12 }}>{message}</Text>
    </SafeAreaView>
  );
}
