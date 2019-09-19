import firebase from 'react-native-firebase';
// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

// Function used in: 'CreateAccountScreen' to set username
export const uploadUsername = async (user, username, dataKey, props) => {
  try {
    // update Admin Database first
    await user.updateProfile({
      displayName: username,
    });
    // update secondary Non-admin database
    await usersRef.child(dataKey).update({
      username,
    });
    props.navigation.navigate('ProfilePhoto', {
      dataKey,
      user,
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function to update firebase db with url to profile picture
const uploadUserImagetoDatabases = async (url, user, dataKey) => {
  try {
    const verifyRef = usersRef.child(dataKey);
    await user.updateProfile({
      photoURL: url,
    });
    await verifyRef.update({
      profilePhoto: url,
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: 'ProfilePhotoScreen' to upload image to firebase storage
export const uploadImageToFirebaseStorage = async (image, user, key) => {
  try {
    const storeImageRef = firebase.storage().ref(`images/${user.uid}`);
    await storeImageRef.put(image.path, { contentType: 'image/jpeg' });
    const url = await storeImageRef.getDownloadURL();
    // Function to upload image to both Admin and Non-admin databases
    await uploadUserImagetoDatabases(url, user, key);
  } catch (err) {
    console.warn(err);
  }
};

// Function to upload youtube video URL & startTime to database
// Function used in: 'SetupProfileVideo'
export const uploadProfileVideo = (key, url, startTime) => {
  const ref = usersRef.child(key);

  ref
    .update({
      youtubeURL: url,
      startTime,
    })
    .then(data => {
      console.log('data ', data);
    })
    .catch(error => {
      console.log('error ', error);
    });
};
