import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-elements';
// Components
import PhoneNumberInput from '../components/PhoneNumberInput';
// Assets & Data
import flagCollection from '../assets/flags/index';
// Firebase
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
    alignItems: 'center',
  },
  titleText: {
    marginTop: 50,
    fontSize: 50,
  },
  phoneNumberInput: {
    marginTop: 50,
    fontSize: pillFontSize,
  },
  buttonContainer: {
    marginTop: 50,
  },
  button: {
    borderRadius: 50,
    height: pillHeight,
    width: pillWidth,
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
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [flag, setFlag] = useState(flagCollection[country.alpha2Code]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(''); // TO DO integrate into error
  const [confirmResult, setConfirmResult] = useState(
    props.navigation.getParam('confirmResult', null),
  );

  // Event Handlers
  const handleFlagTouch = () => setPopupVisibility(true);
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
      <Text style={styles.titleText}>Enter verification</Text>
      <PhoneNumberInput
        style={styles.phoneNumberInput}
        handleFlagTouch={handleFlagTouch}
        callingCode={country.callingCode}
        flag={flag}
        phoneNumber={codeInput}
        setPhoneNumber={setCodeInput}
        message={message}
      />
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Verify code"
        onPress={handleSubmitButtonPress}
      />
    </SafeAreaView>
  );
}
