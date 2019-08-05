import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import GradientButton from '../components/GradientButton';
import { createUserinDB } from '../actions/authActions';

const { width } = Dimensions.get('window');
const pillWidth = width * 0.9;
const pillFontSize = pillWidth / 20;

const PhoneConfirmationScreen = props => {
  // Initial State
  const [codeInput, setCodeInput] = useState('');
  const [message, setMessage] = useState(''); // TO DO integrate into error
  const [phoneNumber] = useState(
    props.navigation.getParam('phoneNumber', null),
  );
  const [confirmResult] = useState(
    props.navigation.getParam('confirmResult', null),
  );

  // Event Handlers
  const confirmCode = () => {
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          setMessage('Code Confirmed!');
          createUserinDB(user, props);
        })
        .catch(error => setMessage(error.message));
    }
  };

  const handleSubmitButtonPress = () => {
    confirmCode();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewOne}>
        <Text style={{ fontSize: 36, color: '#606060' }}>My code is</Text>
        <Text style={{ marginTop: 10, fontSize: 16, color: '#606060' }}>
          Enter it below to verify {phoneNumber}
        </Text>
        <TextInput
          placeholder="Enter verification code"
          style={styles.textInput}
          onChangeText={input => setCodeInput(input)}
        />
        <Text style={{ marginTop: 7, fontSize: 14, color: 'orangered' }}>
          Didn't receive SMS?
        </Text>
      </View>
      <View style={styles.viewTwo}>
        <GradientButton onPress={handleSubmitButtonPress} title="Verify Code" />
        <Text style={{ marginTop: 10, fontSize: 12 }}>{message}</Text>
      </View>
    </SafeAreaView>
  );
};

export default PhoneConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingTop: 40,
  },
  viewOne: {
    paddingLeft: 20,
    height: '100%',
    width: '100%',
    paddingRight: 20,
    flex: 1,
  },
  viewTwo: {
    height: '100%',
    width: '100%',
    paddingTop: 30,
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    marginTop: 20,
    fontSize: pillFontSize,
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    width: '100%',
  },
});
