import firebase from 'react-native-firebase';
// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');
const postsRef = firebase.database().ref('posts/');

// Key refers to non-admin database key for locating Current User
// This redudancy is unavoidable in Firebase
// Function used in: MapScreen, UserProfileScreen, OtherUserScreen
export const getClientUserKey = async user => {
  try {
    const rawData = await usersRef
      .orderByChild('userID')
      .equalTo(user.uid)
      .once('value');

    const key = rawData._childKeys[0];
    return key;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

// Function used to get profile data of client
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

// Function used to retrieve firebase key of the person's profile
// that the client accessed by clicking on that person's avatar
// Function used in: UserProfileScreen
export const getOtherPersonsKey = async name => {
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

// Determining if user exists in secondary non-admin database
// Function used in: LandingPageScreen, PhoneConfirmationScreen
export const confirmUserinFireBase = async user => {
  try {
    const data = await usersRef
      .orderByChild('userID')
      .equalTo(user.uid)
      .once('value');

    const res = data._value ? true : false;
    return res;
  } catch (err) {
    console.warn(err);
  }
};

// Navigate to the screen that completes missing information in User Profile
// Function used in: LandingPageScreen, PhoneNumberScreen, PhoneConfirmationScreen
export const checkForProfileFields = async (user, props) => {
  const key = await getClientUserKey(user);

  if (!user.displayName) {
    props.navigation.navigate('Create', {
      user,
      dataKey: key,
    });
  }
  if (user.displayName && !user.photoURL) {
    props.navigation.navigate('ProfilePhoto', {
      user,
      dataKey: key,
    });
  }
  if (user.displayName && user.photoURL) {
    props.navigation.navigate('Home', {
      user,
    });
  }
};

// Creating User in secondary (non-admin) firebase database
// Function used in: PhoneConfirmationScreen
export const createInitialProfileFields = (user, props) => {
  usersRef
    .push({
      userID: user.uid,
      userPhoneNumber: user.phoneNumber,
      followingCount: 0,
      followersCount: 0,
      locationOn: false,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    })
    .then(data => {
      props.navigation.navigate('Create', {
        dataKey: data.key,
        user,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

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

// Function used in: PhoneNumberScreen.js
export const autoVerify = async (user, props) => {
  try {
    const alreadyRegistered = await getClientUserKey(user);
    if (alreadyRegistered) {
      checkForProfileFields(user, props);
    } else {
      createInitialProfileFields(user, props);
    }
  } catch (err) {
    console.warn(err);
  }
};
