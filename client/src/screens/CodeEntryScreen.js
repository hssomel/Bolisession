import React, { Component } from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Input, Text, Button, Icon } from 'react-native-elements';

import firebase from 'react-native-firebase';

const brandColor = 'orangered';
const successImageUri =
  'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class phoneAuthScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+1',
      confirmResult: null,
    };
  }

  handlePhoneVerifyPress = () => this.props.navigation.navigate('phEntry');

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+1',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult =>
        this.setState({ confirmResult, message: 'Code has been sent!' }),
      )
      .catch(error =>
        this.setState({
          message: `Sign In With Phone Number Error: ${error.message}`,
        }),
      );
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error =>
          this.setState({ message: `Code Confirm Error: ${error.message}` }),
        );
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      //   <View style={{ padding: 25 }}>
      //     <Text>Enter phone number:</Text>
      //     <TextInput
      //       autoFocus
      //       style={{ height: 40, marginTop: 15, marginBottom: 15 }}
      //       onChangeText={value => this.setState({ phoneNumber: value })}
      //       placeholder={'Phone number ... '}
      //       value={phoneNumber}
      //     />
      //     <Button title="Sign In" color="green" onPress={this.signIn} />
      //   </View>

      <View style={styles.container}>
        <Text style={styles.header}>What's your phone number?</Text>

        <TextInput
          onChangeText={value => this.setState({ phoneNumber: value })}
          keyboardType="phone-pad"
          autoFocus
          style={styles.textInput}
          placeholder="Phone Number"
          placeholderTextColor={brandColor}
          selectionColor={brandColor}
          //underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          returnKeyType="go"
        />

        <TouchableOpacity style={styles.button} onPress={this.signIn}>
          <Text style={styles.buttonText}>Send confirmation code</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimerText}>
          By tapping "Send confirmation code" above, we will send you an SMS to
          confirm your phone number. Message &amp; data rates may apply.
        </Text>
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>
        {message}
      </Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button
          title="Confirm Code"
          color="#841584"
          onPress={this.confirmCode}
        />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {user && (
          <View
            style={{
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#77dd77',
              flex: 1,
            }}
          >
            <Image
              source={{ uri: successImageUri }}
              style={{ width: 100, height: 100, marginBottom: 25 }}
            />
            <Text style={{ fontSize: 25 }}>Signed In!</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Button
              title="Continue"
              color="orangered"
              onPress={this.handlePhoneVerifyPress}
            />
            <Button title="Sign Out" color="red" onPress={this.signOut} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    marginTop: '8%',
    fontSize: 26,
    color: '#4A4A4A',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: '10%',
    width: '90%',
    height: 60,
    fontSize: 26,
    padding: 0,
    margin: 0,
  },
  disclaimerText: {
    marginTop: '8%',
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 12,
    color: 'grey',
  },
  button: {
    marginTop: '12%',
    width: '80%',
    backgroundColor: 'orangered',
    alignItems: 'center',
    borderRadius: 32,
    paddingVertical: 11,
  },
});
