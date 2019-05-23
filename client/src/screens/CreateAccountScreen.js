import React, { useState } from 'react';
import {
  StyleSheet,
  Picker,
  SafeAreaView,
  TextInput,
  Image,
  Text,
  ScrollView,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default function CreateAccountScreen(props) {
  // Initial State
  const [textInputStyle, setTextInputStyle] = useState('50%');
  const [currentTeam, setCurrentTeam] = useState('');
  const [focusOn, setFocusOn] = useState(false);

  // Event Handlers
  const handleOnFocus = () => {
    setTextInputStyle('20%');
    setFocusOn(true);
  };
  const handleOnScroll = () => setTextInputStyle('50%');
  const handleOnBlur = () => setTextInputStyle('50%');

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
        />
        <View style={styles.container2}>
          <Picker
            selectedValue={currentTeam}
            style={styles.picker}
            onValueChange={itemValue => setCurrentTeam(itemValue)}
          >
            <Picker.Item label="Free Agent" value="Free Agent" />
            <Picker.Item label="Bhangra Empire" value="Bhangra Empire" />
            <Picker.Item label="UCR Bhangra" value="UCR Bhangra" />
            <Picker.Item
              label="Apni Sardari Apni Pechaan"
              value="Apni Sardari Apni Pechaan"
            />
          </Picker>
        </View>
        {focusOn && (
          <Button
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
    alignItems: 'center',
    backgroundColor: 'white',
    height: '50%',
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
  picker: {
    width: '105%',
    height: 60,
    marginTop: '10%',
    marginBottom: '-3%',
    fontSize: 8,
    color: 'grey',
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
