import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { capturePhoneNum } from '../actions/authActionDispatchers';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import firebase from 'react-native-firebase';
const brandColor = 'orangered';

class phoneAuthScreen extends Component {
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
      .then(confirmResult => {
        this.setState({ confirmResult, message: 'Code has been sent!' });
        this.props.capturePhoneNum({ phoneNumber });
        this.props.navigation.navigate('codeEntry', {
          confirmResult: this.state.confirmResult,
        });
      })
      .catch(error =>
        this.setState({
          message: `Sign In With Phone Number Error: ${error.message}`,
        }),
      );
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.header}>What is your phone number?</Text>
          <TextInput
            onChangeText={value => this.setState({ phoneNumber: value })}
            keyboardType="phone-pad"
            autoFocus
            style={styles.textInput}
            placeholder="Phone Number"
            placeholderTextColor={brandColor}
            selectionColor={brandColor}
            value={phoneNumber}
            underlineColorAndroid={'green'}
            autoCapitalize={'none'}
            autoCorrect={false}
            returnKeyType="go"
          />
          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            <Text style={styles.buttonText}>Send confirmation code</Text>
          </TouchableOpacity>
          <Text style={styles.disclaimerText}>
            By tapping "Send confirmation code" above, we will send you an SMS
            to confirm your phone number. Message &amp; data rates may apply.
          </Text>
        </SafeAreaView>
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

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {!user && !confirmResult && this.renderPhoneNumberInput()}
        {this.renderMessage()}
      </View>
    );
  }
}

phoneAuthScreen.propTypes = {
  capturePhoneNum: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  // errors: state.errors,
});

export default connect(
  mapStateToProps,
  { capturePhoneNum },
)(phoneAuthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  safeArea: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
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
    // textAlign: 'center',
    // alignItems: 'center',
    marginTop: '10%',
    width: '100%',
    height: 60,
    fontSize: 16,
    padding: 0,
    margin: 0,
    // marginLeft: '15%',
    backgroundColor: 'purple',
  },
  disclaimerText: {
    marginTop: '5%',
    marginLeft: '10%',
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
