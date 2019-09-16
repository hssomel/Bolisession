import firebase from 'react-native-firebase';
// Firebase References
const messageRef = firebase.database().ref('messages/');
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

// Function used to generate unique thread key between two users
// Function called by: MessagingListScreen.js & OtherUserProfileHeader.js
export const generateThreadID = async (user, name) => {
  const string1 = user.uid.toString();
  const string2 = name.toString();
  const threadID =
    string1 < string2 ? string1.concat(string2) : string2.concat(string1);
  return threadID;
};

// Function called by: MessagingListScreen.js & OtherUserProfileHeader.js
export const createOrVerifyThread = async threadID => {
  try {
    const snapshot = await messageRef
      .orderByChild('_threadID')
      .equalTo(threadID)
      .once('value');

    if (!snapshot.val()) {
      // Create a new message thread in database
      const newThreadData = await messageRef.push({
        _threadID: threadID,
        messages: {},
      });
      return newThreadData.key;
    } else {
      // Message thread already exists
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

// Function used in MessagingListScreen to get users information
export const getUsers = async user => {
  try {
    const usersArray = [];
    const query = usersRef.limitToLast(100);

    const snapshot = await query.once('value');
    snapshot.forEach(data => {
      if (data._value.username != user.displayName) {
        usersArray.push(data);
      }
    });
    return usersArray;
  } catch (err) {
    console.warn(err);
  }
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
