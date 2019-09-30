import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, View } from 'react-native';
import { Text } from 'react-native-elements';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PhoneNumberInput from '../../components/NumberEntryComponents/PhoneNumberInput';
import CountrySelector from '../../components/NumberEntryComponents/CountrySelector';
import GradientButton from '../../components/GradientButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import flagCollection from '../../assets/flags/index';
import countryData from '../../assets/countryData';
import {
  initializeUserCredentials,
  initializeProfileData,
} from '../../actions/authActions';

const { height, width } = Dimensions.get('window');

const PhoneNumberScreen = ({
  navigation,
  initializeProfileData,
  initializeUserCredentials,
}) => {
  // Initial State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState({
    name: 'United States of America',
    alpha2Code: 'us',
    callingCode: 1,
  });
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [flag, setFlag] = useState(flagCollection[country.alpha2Code]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(null);

  // Event Handlers
  const handleFlagTouch = () => setPopupVisibility(true);

  const checkAutoVerification = async () => {
    let doesUserExist;
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      doesUserExist = user ? user : false;
    });
    if (unsubscribe) unsubscribe();
    return doesUserExist;
  };

  const signIn = async () => {
    try {
      setMessage('Sending code ...');
      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber(`+${country.callingCode}${phoneNumber}`);
      setIsLoading(true);
      const user = await checkAutoVerification();
      if (user) {
        const key = await initializeUserCredentials(user);
        initializeProfileData(key, navigation);
      } else {
        navigation.navigate('codeEntry', {
          confirmResult: confirmation,
          phoneNumber,
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingIndicator size="large" color="orangered" />
      ) : (
        <View style={styles.container}>
          <View style={styles.viewOne}>
            <Text style={{ fontSize: 36, color: '#606060' }}>My number is</Text>
          </View>
          <View style={styles.viewTwo}>
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
            <Text style={styles.disclaimerText}>
              When you tap Verify SMS, BholiSession will send a text with a
              verification code. Message and data rates may apply. The verified
              phone number can be used to login.
            </Text>
          </View>
          <View style={styles.viewThree}>
            <GradientButton onPress={signIn} title="Get SMS Code" />
            <Text style={styles.messageText}>{message}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

PhoneNumberScreen.propTypes = {
  initializeUserCredentials: PropTypes.func.isRequired,
  initializeProfileData: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { initializeProfileData, initializeUserCredentials },
)(PhoneNumberScreen);

const styles = StyleSheet.create({
  container: {
    height,
    alignItems: 'flex-start',
  },
  viewOne: {
    height: height * 0.12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  viewTwo: {
    height: height * 0.18,
    width,
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 15,
  },
  viewThree: {
    alignItems: 'center',
    width,
    marginTop: 50,
  },
  phoneNumberInput: {
    marginTop: 50,
    fontSize: 18,
  },
  disclaimerText: {
    marginTop: 20,
    fontSize: 12,
    color: 'grey',
  },
  messageText: {
    marginTop: 10,
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 15,
  },
});
