import firebase from 'react-native-firebase';
// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

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

// Function to update firebase db with url to profile pic
const uploadUserImagetoDatabases = (url, user, dataKey) => {
  const verifyRef = usersRef.child(dataKey);
  user
    .updateProfile({
      photoURL: url,
    })
    .then(() => {
      verifyRef.update({
        profilePhoto: url,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadImageToFirebaseStorage = async (image, user, key) => {
  try {
    const storeImageRef = firebase.storage().ref(`images/${user.uid}`);
    await storeImageRef.put(image.path, { contentType: 'image/jpeg' });
    const url = await storeImageRef.getDownloadURL();
    // Function to upload image to both Admin and Non-admin databases
    uploadUserImagetoDatabases(url, user, key);
  } catch (err) {
    console.warn(err);
  }
};
