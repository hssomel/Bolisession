import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-elements';
// Components
import PhoneNumberInput from '../components/PhoneNumberInput';
import CountrySelector from '../components/CountrySelector';

// Assets & Data
import flagCollection from '../assets/flags/index';
import countryData from '../assets/countryData';
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
export default function PhoneNumberScreen(props) {
  // Initial State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState({
    name: 'United States of America',
    alpha2Code: 'us',
    callingCode: 1,
  });
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [flag, setFlag] = useState(flagCollection[country.alpha2Code]);
  const [message, setMessage] = useState(''); // TO DO integrate into error
  const [confirmResult, setConfirmResult] = useState(null);

  // Event Handlers
  const handleFlagTouch = () => setPopupVisibility(true);
  const handleSubmitButtonPress = () => {
    signIn();
  };

  // Firebase SignIn method
  const signIn = () => {
    setMessage('Sending code ...');

    firebase
      .auth()
      .signInWithPhoneNumber(`+${country.callingCode}${phoneNumber}`)
      .then(confirmation => {
        setConfirmResult(confirmation);
        setMessage('Code has been sent!');
        props.navigation.navigate('codeEntry', {
          confirmResult: confirmation,
        });
      })
      .catch(error => setMessage(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Welcome</Text>
      <PhoneNumberInput
        style={styles.phoneNumberInput}
        handleFlagTouch={handleFlagTouch}
        callingCode={country.callingCode}
        flag={flag}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        message={message}
      />
      <CountrySelector
        setFlag={setFlag}
        countryData={countryData}
        popupVisibility={popupVisibility}
        setCountry={setCountry}
        setPopupVisibility={setPopupVisibility}
        flagCollection={flagCollection}
      />
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Get SMS Code"
        onPress={handleSubmitButtonPress}
      />
    </SafeAreaView>
  );
}
