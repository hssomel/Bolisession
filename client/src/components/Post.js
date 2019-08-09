import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import {
  addUserToLikesArray,
  removeUserFromLikesArray,
} from '../actions/userProfileActions';

const Post = props => {
  // Initial State
  const { item, user } = props;
  const [liked, setHasLiked] = useState(null);
  const [likeCounter, setLikeCounter] = useState(null);
  // Firebase Reference
  const postsRef = firebase.database().ref('posts/');
  // Event Handlers
  const hasUserLiked = () => {
    postsRef
      .child(item.key)
      .child('usersLiked')
      .orderByChild('user_name')
      .equalTo(user.displayName)
      .once('value')
      .then(snapshot => {
        setHasLiked(snapshot.val());
        setLikeCounter(item._value.likes);
      });
  };

  const adjustLikes = key => {
    const userLikedRef = postsRef.child(key).child('usersLiked');
    userLikedRef
      .orderByChild('user_name')
      .equalTo(user.displayName)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          addUserToLikesArray(key, user.displayName);
        } else {
          removeUserFromLikesArray(key, user.displayName);
        }
      });
  };

  const handlePress = item => {
    setTimeout(() => {
      adjustLikes(item.key);
      if (liked) {
        setHasLiked(null);
        const counter = likeCounter - 1;
        setLikeCounter(counter);
      } else {
        setHasLiked(true);
        const positivecounter = likeCounter + 1;
        setLikeCounter(positivecounter);
      }
    }, 100);
  };

  const handleAvatarPress = () => {
    props.navigation.navigate('Profile', {
      item: item,
      name: item._value.username,
    });
  };

  useEffect(() => {
    hasUserLiked();
  }, []);

  return (
    <View style={styles.tweet}>
      <View style={styles.firstContainer}>
        <TouchableHighlight underlayColor="white" activeOpacity={0.75}>
          <View>
            <Avatar
              source={{
                uri: item._value.profilePhoto,
              }}
              rounded
              size={60}
              onPress={handleAvatarPress}
            />
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.secondaryContainer}>
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>{'@' + item._value.username}</Text>
        </View>
        <View style={styles.tweetBodyContainer}>
          <Text style={styles.tweetText}>{item._value.text}</Text>
        </View>
        <View style={styles.footerContainer}>
          <TouchableHighlight>
            <View style={styles.iconContainer}>
              <Icon name="md-chatboxes" size={20} />
              <Text style={styles.badgeCount}>{item._value.comments}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={styles.iconContainer}>
              <Icon name="md-repeat" size={20} />
              <Text style={styles.badgeCount}>{item._value.retweets}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={styles.iconContainer}>
              {liked && (
                <Icon
                  name="ios-heart"
                  size={25}
                  color="red"
                  onPress={() => handlePress(item)}
                />
              )}
              {!liked && (
                <Icon
                  name="ios-heart-empty"
                  size={25}
                  onPress={() => handlePress(item)}
                />
              )}
              <Text style={styles.badgeCount}>{likeCounter}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};
export default withNavigation(Post);

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  secondaryContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  tweet: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 15,
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tweetText: {
    marginTop: 1,
    fontSize: 17,
    color: 'black',
    paddingLeft: 2,
  },
  tweetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    backgroundColor: '#ff3333',
  },
  usernameContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  tweetBodyContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  footerContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 5,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  badgeCount: {
    fontSize: 16,
    paddingLeft: 7,
  },
});
