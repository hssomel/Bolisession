import firebase from 'react-native-firebase';
// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');
const postsRef = firebase.database().ref('posts/');

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

export const confirmUserExists = user => {
  return new Promise(resolve => {
    usersRef
      .orderByChild('userID')
      .equalTo(user.uid)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
  });
};
