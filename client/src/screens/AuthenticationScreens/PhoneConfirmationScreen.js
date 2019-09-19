import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import { Text } from 'react-native-elements';
import GradientButton from '../../components/GradientButton';
import {
  confirmUserinFireBase,
  checkForProfileFields,
  createInitialProfileFields,
} from '../../actions/Authentication/authActions';

const { height, width } = Dimensions.get('window');

const PhoneConfirmationScreen = ({ navigation }) => {
  const phoneNumber = navigation.getParam('phoneNumber', null);
  const confirmResult = navigation.getParam('confirmResult', null);
  // Initial State
  const [message, setMessage] = useState(''); // TO DO integrate into error
  const [codeInput, setCodeInput] = useState('');
  // Event Handlers
  const handlePress = () => {
    Alert.alert('Please re-enter number and try again!');
    navigation.goBack();
  };

  const checkForExistingUser = async user => {
    const doesExist = await confirmUserinFireBase(user);
    if (doesExist) {
      checkForProfileFields(user, navigation);
    } else {
      createInitialProfileFields(user, navigation);
    }
  };

  const confirmCode = () => {
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          setMessage('Code Confirmed!');
          checkForExistingUser(user);
        })
        .catch(error => setMessage(error.message));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewOne}>
        <Text style={{ fontSize: 36, color: '#606060' }}>My code is</Text>
        <Text style={{ marginTop: 10, fontSize: 16, color: '#606060' }}>
          Enter it below to verify +1{phoneNumber}
        </Text>
        <TextInput
          placeholder="Enter verification code"
          style={styles.textInput}
          onChangeText={input => setCodeInput(input)}
        />
        <Text style={styles.smsText} onPress={handlePress}>
          Didn't receive SMS?
        </Text>
      </View>
      <View style={styles.viewTwo}>
        <GradientButton onPress={confirmCode} title="Verify Code" />
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
    alignItems: 'flex-start',
    height,
  },
  viewOne: {
    paddingLeft: 20,
    paddingRight: 20,
    height: height * 0.3,
    width,
    marginTop: 20,
  },
  viewTwo: {
    height: height * 0.15,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    marginTop: height * 0.075,
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    width: '100%',
    paddingBottom: '-1%',
  },
  smsText: {
    marginTop: 8,
    fontSize: 15,
    color: 'orangered',
    marginBottom: 10,
  },
});
