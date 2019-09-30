import firebase from 'react-native-firebase';
import { SET_CLIENT_KEY, INITIAL_CLIENT_PROFILE_FIELDS } from './actionTypes';

// Firebase references
const postsRef = firebase.database().ref('posts/');
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

// Function used to initalize new profile
const setupNewAccountProfile = async user => {
  try {
    const { uid, phoneNumber } = user;
    const snapshot = await usersRef.push({
      userID: uid,
      userPhoneNumber: phoneNumber,
      followingCount: 0,
      followersCount: 0,
      locationOn: false,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    });

    return snapshot.key;
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: LandingPageScreen.js & PhoneNumberScreen.js
export const initializeUserCredentials = user => async dispatch => {
  try {
    let clientKey;
    const { uid } = user;
    // Check if uid matches an existing key in the 'Profile' Collection
    const data = await usersRef
      .orderByChild('userID')
      .equalTo(uid)
      .once('value');

    clientKey = data._childKeys[0];
    if (!clientKey) {
      // Client is new user who just verified account
      clientKey = await setupNewAccountProfile(user);
    }
    dispatch({
      type: SET_CLIENT_KEY,
      payload: clientKey,
    });
    return clientKey;
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: LandingPageScreen.js & PhoneNumberScreen.js
export const initializeProfileData = (key, navigation) => async dispatch => {
  try {
    const data = await usersRef.child(key).once('value');
    const profileData = data.val();
    const { username, profilePhoto } = profileData;

    dispatch({
      type: INITIAL_CLIENT_PROFILE_FIELDS,
      payload: profileData,
    });

    if (!username) {
      navigation.navigate('Create');
    }
    if (username && !profilePhoto) {
      navigation.navigate('ProfilePhoto');
    }
    if (username && profilePhoto) {
      navigation.navigate('Home');
    }
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: UserProfileScreen
export const getProfileKey = async name => {
  try {
    const rawData = await usersRef
      .orderByChild('username')
      .equalTo(name)
      .once('value');

    const key = rawData._childKeys[0];
    return key;
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: UserProfileScreen
export const getProfileData = async key => {
  try {
    const rawData = await usersRef.child(key).once('value');
    const profileData = rawData.val();
    return profileData;
  } catch (err) {
    console.warn(err);
  }
};

// Function used in SettingsScreen.js
export const removeUserFromDatabases = async (key, name) => {
  try {
    // Removing from 'User' Collection in database
    await usersRef.child(key).remove();
    // Removing from 'Posts' Collection in database
    // Deleting every post created by user
    const snapshot = await postsRef
      .orderByChild('username')
      .equalTo(name)
      .once('value');
    snapshot.forEach(post => {
      postsRef.child(post.key).remove();
    });
  } catch (err) {
    console.warn(err);
  }
};
