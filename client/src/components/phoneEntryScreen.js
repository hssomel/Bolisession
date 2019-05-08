import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Form from 'react-native-form';
const brandColor = '#744BAC';

class phoneEntryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enterCode: false,
      spinner: false,
      phoneNumber: '',
    };
  }

  handleChange(type, value) {
    this.setState({ [type]: value });
  }

  handlePhoneAuthPress = () => this.props.navigation.navigate('phCodeVerify');

  _renderCallingCode = () => {
    return (
      <View style={styles.callingCodeView}>
        <Text style={styles.callingCodeText}>+1</Text>
      </View>
    );
  };

  _renderFooter = () => {
    return (
      <View>
        <Text style={styles.disclaimerText}>
          By tapping "Send confirmation code" above, we will send you an SMS to
          confirm your phone number. Message &amp; data rates may apply.
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>What's your phone number?</Text>

        <Form ref={'form'} style={styles.form}>
          <View style={{ flexDirection: 'row' }}>
            {this._renderCallingCode()}

            <TextInput
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={value => this.handleChange('phoneNumber', value)}
              placeholder="_ _ _ _ _ _"
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              style={[styles.textInput]}
              returnKeyType="go"
              autoFocus
              placeholderTextColor={brandColor}
              selectionColor={brandColor}
              maxLength={10}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={this.handlePhoneAuthPress}
          >
            <Text style={styles.buttonText}>Send confirmation code</Text>
          </TouchableOpacity>

          {this._renderFooter()}
        </Form>
      </View>
    );
  }
}

export default phoneEntryScreen;

const styles = StyleSheet.create({
  //   container: {
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: 'white',
  //     height: '100%',
  //     width: '100%',
  //   },
  container: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 22,
    margin: 20,
    color: '#4A4A4A',
  },
  buttonText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: 20,
    color: brandColor,
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: 'grey',
  },
});
