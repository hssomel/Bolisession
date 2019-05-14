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
import { captureUser, signOutUser } from '../actions/authActionDispatchers';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import firebase from 'react-native-firebase';

const successImageUri =
  'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

class CodeEntryScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: this.props.auth.user,
      message: '',
      codeInput: '',
      phoneNumber: this.props.auth.phoneNumber,
      confirmResult: this.props.navigation.getParam('confirmResult', null),
    };
  }

  componentDidMount() {
    console.log('codeEntryScreen loaded');
    console.log(JSON.stringify(user));
  }

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.setState({ message: 'Code Confirmed!' });
          this.props.captureUser({ user });
        })
        .catch(error =>
          this.setState({ message: `Code Confirm Error: ${error.message}` }),
        );
    }
  };

  signOut = () => {
    firebase.auth().signOut();
    this.props.signOutUser();
  };

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

  handlePress = () => {
    this.props.navigation.navigate('Feed');
  };

  render() {
    const { user } = this.props.auth;
    const { confirmResult } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {!user && confirmResult && this.renderVerificationCodeInput()}

        {this.renderMessage()}

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
              onPress={this.handlePress}
            />
            <Button title="Sign Out" color="red" onPress={this.signOut} />
          </View>
        )}
      </View>
    );
  }
}

CodeEntryScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  captureUser: PropTypes.func.isRequired,
  signOutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { captureUser, signOutUser },
)(CodeEntryScreen);

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
