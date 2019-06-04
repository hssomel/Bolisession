import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  Image,
  View,
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
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
    flexDirection: 'column',
  },
  container1: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  titleText: {
    marginTop: 50,
    fontSize: 36,
    color: '#606060',
  },
  titleText1: {
    marginTop: 10,
    fontSize: 16,
    color: '#606060',
  },
  text1: {
    marginTop: 10,
    fontSize: 14,
    color: '#606060',
  },
  textInput: {
    marginTop: 30,
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
  image: {
    height: 60,
    width: 60,
    marginTop: '2.5%',
    alignItems: 'center',
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
      {/* <View style={styles.container1}>
        <Image
          source={require('../assets/images/dhol.png')}
          style={styles.image}
        />
      </View> */}
      <Text style={styles.titleText}>My code is</Text>
      <Text style={styles.titleText1}>
        Enter it below to verify +1 714-553-5985
      </Text>
      <TextInput
        placeholder="Enter verification code"
        style={styles.textInput}
        onChangeText={input => setCodeInput(input)}
      />
      <Text style={{ marginTop: 7, fontSize: 14, color: 'orangered' }}>
        Didn't receive SMS?
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
        title="Verify Code"
        fontSize={38}
      />
      <Text style={{ marginTop: 10, fontSize: 12 }}>{message}</Text>
    </SafeAreaView>
  );
}
