import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExistingMessages } from '../../actions/Messaging/messagingActions';

const PrivateMessageScreen = ({ user: { username, profilePhoto, userID } }) => {
  // Initial State
  const [messages, setMessages] = useState([]);
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
        _id: userID,
        name: username,
        avatar: profilePhoto,
      }}
    />
  );
};

PrivateMessageScreen.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(PrivateMessageScreen);
