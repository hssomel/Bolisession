import firebase from 'react-native-firebase';
import { UPDATE_CLIENT_PROFILE } from './actionTypes';

// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

// Function used in: CreateAccountScreen.js
export const uploadUsername = (key, name, navigation) => async dispatch => {
  try {
    await usersRef.child(key).update({
      username: name,
    });
    // Retrieve entire profile
    const data = await usersRef.child(key).once('value');
    const profileData = data.val();
    dispatch({
      type: UPDATE_CLIENT_PROFILE,
      payload: profileData,
    });
    navigation.navigate('ProfilePhoto');
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: ProfilePhotoScreen.js
export const uploadPhotoToFirebase = (image, key, userID) => async dispatch => {
  try {
    const storeImageRef = firebase.storage().ref(`images/${userID}`);
    await storeImageRef.put(image.path, { contentType: 'image/jpeg' });
    const url = await storeImageRef.getDownloadURL();
    await usersRef.child(key).update({
      profilePhoto: url,
    });
    // Retrieve entire profile
    const data = await usersRef.child(key).once('value');
    const profileData = data.val();
    dispatch({
      type: UPDATE_CLIENT_PROFILE,
      payload: profileData,
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: 'SetupProfileVideo'
export const uploadProfileVideo = (key, url, startTime) => async dispatch => {
  try {
    await usersRef.child(key).update({
      youtubeURL: url,
      startTime,
    });
    // Retrieve entire profile
    const data = await usersRef.child(key).once('value');
    const profileData = data.val();
    dispatch({
      type: UPDATE_CLIENT_PROFILE,
      payload: profileData,
    });
  } catch (err) {
    console.warn(err);
  }
};

export const uploadUserBio = (key, bio) => async dispatch => {
  try {
    await usersRef.child(key).update({
      bio,
    });
    // Retrieve entire profile
    const data = await usersRef.child(key).once('value');
    const profileData = data.val();
    dispatch({
      type: UPDATE_CLIENT_PROFILE,
      payload: profileData,
    });
  } catch (err) {
    console.warn(err);
  }
};
