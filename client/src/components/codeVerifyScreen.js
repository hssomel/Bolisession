import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const brandColor = '#744BAC';

class codeVerifyScreen extends React.Component {
  handleChange(type, value) {
    this.setState({ [type]: value });
  }

  handlePhoneVerifyPress = () => this.props.navigation.navigate('phEntry');

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>What's your verification code?</Text>

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
          onPress={this.handlePhoneVerifyPress}
        >
          <Text style={styles.buttonText}>Verify confirmation code</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimerText}>
          Enter the wrong number or need a new code?
        </Text>
      </View>
    );
  }
}

export default codeVerifyScreen;

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
    marginTop: '10%',
    height: 60,
    fontSize: 36,
    padding: 0,
    margin: 0,
    fontWeight: 'bold',
    fontFamily: 'Courier',
    textAlign: 'center',
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
