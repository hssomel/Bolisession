import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import GradientButton from '../components/GradientButton';
import { uploadUserBio } from '../actions/ProfileFields/profileConstructionActions';

const { width, height } = Dimensions.get('window');

const UserBioScreen = ({ navigation }) => {
  const [userKey] = useState(navigation.getParam('userKey', null));
  // Initial State
  const [bio, setBio] = useState('');
  const x = 120 - bio.length;
  // Event Handlers
  const uploadBio = async () => {
    await uploadUserBio(userKey, bio);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/dhol_logo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Describe yourself</Text>
      <Text style={styles.text1}>What makes you unique?</Text>
      <Text style={styles.text2}>Write a couple lines for your bio.</Text>
      <TextInput
        placeholder="Your bio"
        style={styles.textInput}
        onChangeText={input => setBio(input)}
      />
      <Text style={styles.text3}>{x}</Text>
      {bio.length > 2 && (
        <GradientButton title="APPLY CHANGES" onPress={uploadBio} />
      )}
    </SafeAreaView>
  );
};

export default UserBioScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height,
    width,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '8%',
  },
  text1: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    color: 'grey',
    marginTop: '3%',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    color: 'grey',
    marginTop: '1%',
  },
  text3: {
    fontSize: 17,
    fontFamily: 'Gill Sans',
    color: 'grey',
    marginTop: '1%',
    marginLeft: '75%',
    marginBottom: '5%',
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    fontSize: 20,
    width: '90%',
    paddingBottom: '-1%',
    marginTop: '6%',
  },
  image: {
    height: 60,
    width: 60,
    marginTop: '2%',
  },
});
