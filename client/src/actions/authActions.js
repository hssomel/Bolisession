import firebase from 'react-native-firebase';
// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

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
        } else {
          props.navigation.navigate('ProfilePhoto', {
            user,
            dataKey: data.key,
          });
        }
      });
    });
};

// Determining if user exists in secondary non-admin database
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
        props.navigation.navigate('Home', {
          user,
        });
      }
    });
};
