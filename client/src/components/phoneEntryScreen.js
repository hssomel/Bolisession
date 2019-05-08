import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>What's your phone number?</Text>

        <TextInput
          type={'TextInput'}
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={value => this.handleChange('phoneNumber', value)}
          placeholder="_ _ _ _ _ _ _ _ _ _"
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          style={[styles.textInput]}
          returnKeyType="go"
          autoFocus
          placeholderTextColor={brandColor}
          selectionColor={brandColor}
          maxLength={10}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.handlePhoneAuthPress}
        >
          <Text style={styles.buttonText}>Send confirmation code</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimerText}>
          By tapping "Send confirmation code" above, we will send you an SMS to
          confirm your phone number. Message &amp; data rates may apply.
        </Text>
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
    marginTop: '10%',
    height: 60,
    fontSize: 26,

    padding: 0,
    margin: 0,
  },
  disclaimerText: {
    marginTop: '10%',
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
