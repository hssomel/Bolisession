import firebase from 'react-native-firebase';
// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

// Navigate to route that completes missing information in User Profile
export const navigateToIncomplete = (user, props) => {
  usersRef
    .orderByChild('userID')
    .equalTo(user.uid)
    .once('value', snapshot => {
      snapshot.forEach(data => {
        if (!user.displayName) {
          props.navigation.navigate('Create', {
            user,
            dataKey: data.key,
          });
        }
        if (user.displayName && !user.photoURL) {
          props.navigation.navigate('ProfilePhoto', {
            user,
            dataKey: data.key,
          });
        } else {
          props.navigation.navigate('Home', {
            user,
          });
        }
      });
    });
};

// Determining if user exists in secondary non-admin database
// Function used in: LandingPageScreen
export const confirmUserExistsinDB = (user, props, setIsLoaded) => {
  usersRef
    .orderByChild('userID')
    .equalTo(user.uid)
    .once('value', snapshot => {
      if (!snapshot.val()) {
        setIsLoaded(true);
      } else {
        // User Exists
        if (user.displayName && user.photoURL) {
          props.navigation.navigate('Home', {
            user,
          });
        }
        if (!user.displayName || !user.photoURL) {
          navigateToIncomplete(user, props);
        }
      }
    });
};

// function to update non-admin database
const uploadUsernametoDB = (user, username, dataKey, alert, props) => {
  usersRef
    .child(dataKey)
    .update({
      username,
    })
    .then(() => {
      props.navigation.navigate('ProfilePhoto', {
        dataKey,
        user,
      });
    })
    .catch(error => {
      console.log('error ', error);
      alert();
    });
};

export const uploadUsername = (user, username, dataKey, alert, props) => {
  // update Admin Database first
  user
    .updateProfile({
      displayName: username,
    })
    .then(() => {
      // update Secondary Database
      uploadUsernametoDB(user, username, dataKey, alert, props);
    })
    .catch(error => {
      console.log(error);
      alert();
    });
};

// Creating User in non-admin database
// locationOn attribute will be turned to false if user rejects location Permissions
export const createUserinDB = (user, props) => {
  usersRef
    .orderByChild('userID')
    .equalTo(user.uid)
    .once('value', snapshot => {
      if (!snapshot.val()) {
        usersRef
          .push({
            userID: user.uid,
            userPhoneNumber: user.phoneNumber,
            followingCount: 0,
            followersCount: 0,
            locationOn: true,
          })
          .then(data => {
            props.navigation.navigate('Create', {
              dataKey: data.key,
              user,
            });
          })
          .catch(err => {
            console.log('error ', err);
          });
      } else {
        // User already exists
        navigateToIncomplete(user, props);
      }
    });
};

// Key refers to non-admin database key for locating Current User
// This redudancy is unavoidable in Firebase
// Function used in: MapScreen, UserProfileScreen, OtherUserScreen
export const getCurrentUserKey = user => {
  return new Promise((resolve, reject) => {
    usersRef
      .orderByChild('userID')
      .equalTo(user.uid)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          resolve(data);
        });
      })
      .then(() => {
        console.log('user key successfully obtained');
      })
      .catch(() => {
        reject(new Error('unable to obtain user key'));
      });
  });
};
