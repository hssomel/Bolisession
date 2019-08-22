import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import GradientButton from '../components/GradientButton';
import { createUserinDB } from '../actions/authActions';

const PhoneConfirmationScreen = props => {
  // Initial State
  const [message, setMessage] = useState(''); // TO DO integrate into error
  const [codeInput, setCodeInput] = useState('');
  const [phoneNumber] = useState(
    props.navigation.getParam('phoneNumber', null),
  );
  const [confirmResult] = useState(
    props.navigation.getParam('confirmResult', null),
  );

  // Event Handlers
  const handlePress = () => {
    Alert.alert('Please re-enter number and try again!');
    props.navigation.navigate('phone');
  };

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
        <Text
          style={{
            marginTop: 7,
            fontSize: 14,
            color: 'orangered',
            marginBottom: 10,
          }}
          onPress={handlePress}
        >
          Didn't receive SMS?
        </Text>
      </View>
      <View style={styles.viewTwo}>
        <GradientButton onPress={handleSubmitButtonPress} title="Verify Code" />
        <Text style={{ marginTop: 10, fontSize: 12, paddingLeft: 20 }}>
          {message}
        </Text>
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
    height: '100%',
    width: '100%',
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
    paddingTop: 20,
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    marginTop: 20,
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    width: '100%',
    paddingBottom: '-1%',
  },
});
