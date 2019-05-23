import React, { useState } from 'react';
import {
  StyleSheet,
  Picker,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from 'react-native';

export default function CreateAccountScreen(props) {
  // Initial State
  const [textInputStyle, setTextInputStyle] = useState(
    // borderBottomWidth: 2,
    // borderBottomColor: 'red',
    // fontSize: 20,
    // width: '80%',
    // paddingBottom: '-1%',
    '50%',
  );
  const [currentTeam, setCurrentTeam] = useState('');

  // Event Handlers
  const handleOnFocus = () => setTextInputStyle('20%');
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
          placeholder={'Username'}
          onFocus={handleOnFocus}
          onScroll={handleOnScroll}
          onBlur={handleOnBlur}
          style={{
            borderBottomWidth: 2.2,
            borderBottomColor: 'red',
            fontSize: 20,
            width: '80%',
            paddingBottom: '-1%',
            marginTop: textInputStyle,
          }}
        />
        <Picker
          selectedValue={currentTeam}
          style={styles.picker}
          onValueChange={itemValue => setCurrentTeam(itemValue)}
        >
          <Picker.Item label="Free Agent" value="Free Agent" />
          <Picker.Item label="Bhangra Empire" value="Bhangra Empire" />
          <Picker.Item label="UCR Bhangra" value="UCR Bhangra" />
        </Picker>
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
  //   textInput: {
  //     borderBottomWidth: 2,
  //     borderBottomColor: 'red',
  //     fontSize: 20,
  //     width: '80%',
  //     paddingBottom: '-1%',
  //   },
  picker: {
    width: '85%',
    height: 60,
    marginTop: '12%',
  },
});
