import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';

export default function HeartRed(props) {
  const postsRef = firebase.database().ref('posts/');
  const { item, key, user } = props;
  const heartRef = postsRef
    .child(item.key)
    .child('usersLiked')
    .orderByChild('user_name')
    .equalTo(user.displayName);

  return (
    <Icon
      name="ios-heart"
      size={20}
      color="red"
      onPress={() => handleLikePress(item, item.key)}
    />
  );
}
