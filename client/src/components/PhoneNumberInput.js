import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Text, Image } from 'react-native-elements';

// To make this safe for all devices
const { width } = Dimensions.get('window');
const componentHeight = 50;
const componentWidth = width * 0.9;
const inputFontSize = componentWidth / 20;
const leftViewPercent = 40;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: componentHeight,
    width: componentWidth,
    borderRadius: componentHeight,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  leftView: {
    height: '100%',
    width: (componentWidth * leftViewPercent) / 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableOpacity: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flagImage: {
    height: inputFontSize, // max height
    width: (inputFontSize * 5) / 3, // will scale
  },
  callingCode: {
    fontSize: inputFontSize,
  },
  rightView: {
    height: '100%',
    width: (componentWidth * (100 - leftViewPercent)) / 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: componentHeight / 2,
  },
  textInput: {
    height: '100%',
    width: '100%',
    fontSize: inputFontSize,
  },
  errorMessage: { marginTop: 12, fontSize: 12, color: 'red' },
});

export default function PhoneNumberInput(props) {
  const {
    handleFlagTouch,
    callingCode,
    phoneNumber,
    flag,
    setPhoneNumber,
    style,
  } = props;
  return (
    <>
      <View style={{ ...styles.container, ...style }}>
        <View style={styles.leftView}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={handleFlagTouch}
          >
            <Image
              resizeMethod="scale"
              resizeMode="contain"
              source={flag}
              style={styles.flagImage}
            />
            <Text style={styles.callingCode}> +{callingCode}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightView}>
          <TextInput
            placeholder="Enter Phone Number"
            style={styles.textInput}
            onChangeText={input => setPhoneNumber(input)}
            value={phoneNumber}
            keyboardType="phone-pad"
          />
        </View>
      </View>
      <Text style={styles.errorMessage}>Invalid Phone Number</Text>
    </>
  );
}
