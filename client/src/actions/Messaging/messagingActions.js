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
    }
    // Message thread already exists
    return false;
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

export const getExistingMessages = async key => {
  try {
    const priorMessages = [];
    const snapshot = await messageRef
      .child(key)
      .child('messages')
      .once('value');

    snapshot.forEach(data => {
      priorMessages.push(data._value.message[0]);
    });
    return priorMessages;
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: PrivateMessageScreen.js
export const getMessageThreadKey = async threadID => {
  try {
    const snapshot = await messageRef
      .orderByChild('_threadID')
      .equalTo(threadID)
      .once('value');

    const key = snapshot._childKeys[0];
    return key;
  } catch (err) {
    console.warn(err);
  }
};
