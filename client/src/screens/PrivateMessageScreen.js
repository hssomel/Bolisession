import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, View, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import firebase from 'react-native-firebase';

export default function PrivateMessageScreen(props) {
  // Initial State
  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState(props.navigation.getParam('item', null));
  const [thisUser] = useState(props.navigation.getParam('user', null));
  const [threadID] = useState(props.navigation.getParam('threadID', null));
  const [threadKey, setThreadKey] = useState(
    props.navigation.getParam('threadKey', null),
  );
  // Firebase References
  const messageRef = firebase.database().ref('messages/');

  // Event Handlers
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
        setIsLoaded(true);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  const ImportExistingThread = () => {
    messageRef
      .orderByChild('_threadID')
      .equalTo(threadID)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          setThreadKey(data.key);
          getExistingMessages(data.key);
        });
      });
  };

  useEffect(() => {
    if (!threadKey) {
      ImportExistingThread();
    }
  }, []);

  const onSend = newMessage => {
    messageRef
      .child(threadKey)
      .child('messages')
      .push({ message: newMessage })
      .then(() => {
        console.log('successfully added NEW MESSAGE');
      })
      .catch(err => {
        console.log('error', err);
      });

    messages.push(newMessage[0]);
    console.log(messages);
  };

  return (
    <GiftedChat
      renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      messages={messages}
      inverted={false}
      onSend={newMessage => onSend(newMessage)}
      user={{
        _id: thisUser.uid,
        name: thisUser.displayName,
        avatar: thisUser.photoURL,
      }}
    />
  );
}
