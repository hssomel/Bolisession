import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
import { getThreadKey, getExistingMessages } from '../actions/messagingActions';

export default function PrivateMessageScreen(props) {
  // Initial State
  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [otherUserData] = useState(
    props.navigation.getParam('otherUserData', null),
  );
  const [thisUser] = useState(props.navigation.getParam('user', null));
  const [threadID] = useState(props.navigation.getParam('threadID', null));
  const [threadKey, setThreadKey] = useState(
    props.navigation.getParam('threadKey', null),
  );
  // Firebase References
  const messageRef = firebase.database().ref('messages/');

  // Event Handlers
  const renderMessages = async () => {
    const key = await getThreadKey(threadID);
    setThreadKey(key);
    getExistingMessages(key)
      .then(res => {
        setMessages(res);
        setIsLoaded(true);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  useEffect(() => {
    if (!threadKey) {
      renderMessages();
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
