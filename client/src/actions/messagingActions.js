import firebase from 'react-native-firebase';
// Firebase References
const messageRef = firebase.database().ref('messages/');
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

// function used in MessagingListScreen to generate unique thread key between two users
// This function is triggered when the client clicks on another user's avatar
// 'otherUserData' is the Profile Data of the user that the client wishes to message
export const generateThreadKey = (user, otherUserData) => {
  return new Promise((resolve, reject) => {
    const string1 = user.uid.toString();
    const string2 = otherUserData.userID.toString();
    const threadID =
      string1 < string2 ? string1.concat(string2) : string2.concat(string1);
    resolve(threadID);
    if (!threadID) {
      reject(new Error('Incorrect params passed in or user does not exist'));
    }
  });
};

// Function used in MessagingListScreen after completion of generateThreadKey
export const verifyIfThreadExists = (user, threadID, otherUserData, props) => {
  messageRef
    .orderByChild('_threadID')
    .equalTo(threadID)
    .once('value', snapshot => {
      if (!snapshot.val()) {
        messageRef
          .push({ _threadID: threadID, messages: {} })
          .then(data => {
            props.navigation.navigate('PrivateMessage', {
              otherUserData,
              user,
              threadID,
              threadKey: data.key,
            });
          })
          .catch(err => {
            console.log('error', err);
          });
      } else {
        props.navigation.navigate('PrivateMessage', {
          otherUserData,
          user,
          threadID,
        });
      }
    });
};

// Function used in MessagingListScreen to get users information
export const getUsers = user => {
  return new Promise((resolve, reject) => {
    const usersArray = [];
    const query = usersRef.limitToLast(100);

    query
      .once('value', snapshot => {
        snapshot.forEach(data => {
          if (data._value.username != user.displayName) {
            usersArray.push(data);
          }
        });
      })
      .then(() => {
        resolve(usersArray);
      })
      .catch(() => {
        reject(new Error('unable to obtain users'));
      });
  });
};

export const getExistingMessages = key => {
  return new Promise((resolve, reject) => {
    const priorMessages = [];
    messageRef
      .child(key)
      .child('messages')
      .once('value', snapshot => {
        snapshot.forEach(data => {
          priorMessages.push(data._value.message[0]);
        });
      })
      .then(() => {
        resolve(priorMessages);
      })
      .catch(() => {
        reject(new Error('unable to obtain existing messages'));
      });
  });
};

export const getThreadKey = threadID => {
  return new Promise((resolve, reject) => {
    messageRef
      .orderByChild('_threadID')
      .equalTo(threadID)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          resolve(data.key);
        });
      })
      .then(() => {
        console.log('Thread key successfully obtained');
      })
      .catch(() => {
        reject(new Error('unable to obtain thread key'));
      });
  });
};
