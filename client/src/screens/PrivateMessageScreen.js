import React, { useState, useEffect, useRef } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import firebase from 'react-native-firebase';

export default function PrivateMessageScreen(props) {
  // Initial State
  const [messages, setMessages] = useState([]);
  const [threadKey, setThreadKey] = useState(null);
  const [item, setItem] = useState(props.navigation.getParam('item', null));
  const [thisUser, setThisUser] = useState(
    props.navigation.getParam('user', null),
  );
  const [threadID, setThreadID] = useState(
    props.navigation.getParam('threadID', null),
  );
  // Firebase References
  const messageRef = firebase.database().ref('messages/');

  // Event Handlers
  useEffect(() => {
    CreateOrImportThread();
  }, []);

  const getExistingMessages = theKey => {
    const priorMessages = [];
    messageRef
      .child(theKey)
      .child('messages')
      .once('value', snapshot => {
        snapshot.forEach(data => {
          priorMessages.push(data._value.message[0]);
        });
      })
      .then(() => {
        setMessages(priorMessages);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  const CreateOrImportThread = () => {
    messageRef
      .orderByChild('_threadID')
      .equalTo(threadID)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          messageRef
            .push({ _threadID: threadID, messages: {} })
            .then(data => {
              setThreadKey(data.key);
            })
            .catch(err => {
              console.log('error', err);
            });
        } else {
          messageRef
            .orderByChild('_threadID')
            .equalTo(threadID)
            .once('value', snapshot => {
              snapshot.forEach(data => {
                setThreadKey(data.key);
                getExistingMessages(data.key);
              });
            });
        }
      });
  };

  const onSend = newMessage => {
    console.log('the new message object is ', newMessage);
    messageRef
      .child(threadKey)
      .child('messages')
      .push({ message: newMessage })
      .then(data => {
        console.log('successfully added NEW MESSAGE');
      })
      .catch(err => {
        console.log('error', error);
      });
    // messageRef.push({
    //   id: threadID,
    //   username: username,
    //   userPhoto: profilePhoto,
    //   likes: 0,
    //   comments: 0,
    //   retweets: 0,
    //   usersLiked: {},
    // });

    messages.push(newMessage[0]);
    console.log(messages);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => onSend(newMessage)}
      user={{
        _id: thisUser.uid,
        name: thisUser.displayName,
        avatar: thisUser.photoURL,
      }}
    />
  );
}
