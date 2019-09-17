import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
import { getExistingMessages } from '../../actions/Messaging/messagingActions';

export default function PrivateMessageScreen(props) {
  // Initial State
  const [messages, setMessages] = useState([]);
  const [thisUser] = useState(props.navigation.getParam('user', null));
  const [threadKey] = useState(props.navigation.getParam('threadKey', null));
  // Firebase References
  const messageRef = firebase.database().ref('messages/');

  // Event Handlers
  const onSend = async newMessage => {
    try {
      await messageRef
        .child(threadKey)
        .child('messages')
        .push({ message: newMessage });
      messages.push(newMessage[0]);
    } catch (err) {
      console.warn(err);
    }
  };
  const renderMessages = async () => {
    const existingMessages = await getExistingMessages(threadKey);
    setMessages(existingMessages);
  };

  useEffect(() => {
    renderMessages();
  }, []);

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
