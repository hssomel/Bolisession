import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Text,
  ScrollView,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const sports = [
  {
    label: 'Football',
    value: 'football',
  },
  {
    label: 'Baseball',
    value: 'baseball',
  },
  {
    label: 'Hockey',
    value: 'hockey',
  },
];

export default function CreateAccountScreen(props) {
  // Initial State
  const [textInputStyle, setTextInputStyle] = useState('50%');
  const [currentTeam, setCurrentTeam] = useState('');
  const [username, setUserName] = useState('');

  // Event Handlers
  const handleOnFocus = () => {
    setTextInputStyle('20%');
  };
  const handleOnScroll = () => setTextInputStyle('50%');
  const handleOnBlur = () => setTextInputStyle('50%');
  const handlePress = () => {
    props.navigation.navigate('ProfilePhoto');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container1}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../assets/images/bhangra.png')}
          style={styles.image}
        />
        <Text style={styles.text}>Create your account</Text>
        <TextInput
          placeholder="Username"
          onFocus={handleOnFocus}
          onScroll={handleOnScroll}
          onBlur={handleOnBlur}
          style={{
            ...styles.textInput,
            marginTop: textInputStyle,
          }}
          onChangeText={input => setUserName(input)}
        />
        <View style={styles.container2}>
          <RNPickerSelect
            placeholder={{
              label: 'Select a team...',
              value: null,
              color: 'grey',
            }}
            items={sports}
            onValueChange={value => setCurrentTeam(value)}
            value={currentTeam}
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
          />
        </View>
        {username.length > 2 && (
          <Button
            onPress={handlePress}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['red', 'orange'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            title="CONTINUE"
            fontSize={38}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  container1: {
    alignContent: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  container2: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    marginTop: '7%',
    height: '100%',
    width: '83%',
    flex: 1,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  image: {
    height: 60,
    width: 60,
    marginTop: '2.5%',
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '8%',
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    fontSize: 20,
    width: '83%',
    paddingBottom: '-1%',
  },
  buttonContainer: {
    marginTop: '15%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 50,
    width: '85%',
    borderRadius: 25,
  },
});

const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //   fontSize: 16,
  //   paddingVertical: 12,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: 'gray',
  //   borderRadius: 4,
  //   color: 'black',
  //   paddingRight: 30, // to ensure the text is never behind the icon
  // },

  inputAndroid: {
    marginTop: '3%',
    height: '100%',
    paddingVertical: 3,
    justifyContent: 'flex-end',
    paddingRight: '35%',
    fontSize: 20,
    color: 'black',
    height: '100%',
  },
});
