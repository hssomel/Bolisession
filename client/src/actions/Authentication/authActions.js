import firebase from 'react-native-firebase';
// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

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
  try {
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
  } catch (err) {
    console.warn(err);
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
