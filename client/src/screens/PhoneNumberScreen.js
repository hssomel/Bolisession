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
import LinearGradient from 'react-native-linear-gradient';

// Style
const { width } = Dimensions.get('window');
const pillHeight = 50;
const pillWidth = width * 0.88;
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
    fontSize: 36,
    color: '#606060',
  },
  phoneNumberInput: {
    marginTop: 40,
    fontSize: pillFontSize,
    // backgroundColor: '#F1EF55',
    flex: 0.1,
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
  text: {
    marginTop: 20,
    fontSize: 12,
    color: 'grey',
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
        setMessage('Code has been sent!');
        props.navigation.navigate('codeEntry', {
          confirmResult: confirmation,
          phoneNumber: phoneNumber,
        });
      })
      .catch(error => setMessage(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>My number is</Text>
      <PhoneNumberInput
        style={styles.phoneNumberInput}
        handleFlagTouch={handleFlagTouch}
        callingCode={country.callingCode}
        flag={flag}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <CountrySelector
        setFlag={setFlag}
        countryData={countryData}
        popupVisibility={popupVisibility}
        setCountry={setCountry}
        setPopupVisibility={setPopupVisibility}
        flagCollection={flagCollection}
      />
      <Text style={styles.text}>
        When you tap Verify SMS, BholiSession will send a text with a
        verification code. Message and data rates may apply. The verified phone
        number can be used to login.
      </Text>
      <Button
        onPress={handleSubmitButtonPress}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#f12711', '#f5af19'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        title="Get SMS Code"
        fontSize={38}
      />
      <Text style={{ marginTop: 10, fontSize: 12 }}>{message}</Text>
    </SafeAreaView>
  );
}
