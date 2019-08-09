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
import Icon from 'react-native-vector-icons/Ionicons';

// To make this safe for all devices
const { width } = Dimensions.get('window');
const componentHeight = 50;
const componentWidth = width * 0.9;
const inputFontSize = componentWidth / 18;
const leftViewPercent = 40;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: componentHeight,
    width: componentWidth,
    flex: 1,
  },
  viewOne: {
    flex: 0.3,
    marginLeft: 5,
    borderBottomColor: 'orangered',
    borderBottomWidth: 2,
  },
  touchableOpacity: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 2,
    height: 30,
  },
  flagImage: {
    height: inputFontSize, // max height
    width: (inputFontSize * 5) / 3, // will scale
  },
  callingCode: {
    fontSize: inputFontSize,
    marginLeft: 6,
  },
  rightView: {
    marginLeft: '5%',
    flex: 0.61,
    borderBottomColor: 'orangered',
    borderBottomWidth: 2,
  },
  textInput: {
    height: 35,
    paddingBottom: '-1%',
    width: '100%',
    fontSize: inputFontSize,
  },
  // errorMessage: { marginTop: 12, fontSize: 12, color: 'red' },
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
        <View style={styles.viewOne}>
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
            <Icon
              name="md-arrow-dropdown"
              size={25}
              style={{ marginLeft: 20, marginTop: '1%' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightView}>
          <TextInput
            placeholder="Phone Number"
            style={styles.textInput}
            onChangeText={input => setPhoneNumber(input)}
            value={phoneNumber}
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </>
  );
}
