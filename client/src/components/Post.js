import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import {
  addUserToLikesArray,
  removeUserFromLikesArray,
  checkForLikes,
} from '../actions/userProfileActions';

const Post = props => {
  // Initial State
  const { item, user } = props;
  const [liked, setHasLiked] = useState(null);
  const [likeCounter, setLikeCounter] = useState(null);
  // Destructuring props
  const { displayName } = user;
  const {
    username,
    text,
    profilePhoto,
    comments,
    retweets,
    likes,
  } = item._value;
  // Event Handlers
  const hasUserLikedPost = async () => {
    const initalLike = await checkForLikes(item, user);
    setHasLiked(initalLike);
    setLikeCounter(likes);
  };

  const handleLikeButtonPress = async () => {
    let counter;
    if (liked) {
      setHasLiked(null);
      counter = likeCounter - 1;
      await removeUserFromLikesArray(item.key, displayName);
    } else {
      setHasLiked(true);
      counter = likeCounter + 1;
      await addUserToLikesArray(item.key, displayName);
    }
    setLikeCounter(counter);
  };

  const handleAvatarPress = () => {
    if (displayName == username) {
      // Client has clicked on their own avatar of their own post
      props.navigation.navigate('Profile', {
        sameUser: true,
      });
    } else {
      // Client has clicked on someone else's avatar
      props.navigation.navigate('Profile', {
        sameUser: false,
        username,
      });
    }
  };

  const handleRetweetPress = () => {
    Alert.alert(
      'Retweets and Commenting feature will be released next update!',
      'Sit tight as our developers work on releasing a whole new set of features next update!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
    );
  };

  useEffect(() => {
    // Check if client has liked the post
    hasUserLikedPost();
  }, []);

  return (
    <View style={styles.tweet}>
      <View style={styles.firstContainer}>
        <TouchableHighlight underlayColor="white" activeOpacity={0.75}>
          <View>
            <Avatar
              source={{
                uri: profilePhoto,
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
          <Text style={styles.usernameText}>{'@' + username}</Text>
        </View>
        <View style={styles.tweetBodyContainer}>
          <Text style={styles.tweetText}>{text}</Text>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.iconContainer}>
            <Icon name="md-chatboxes" size={20} onPress={handleRetweetPress} />
            <Text style={styles.badgeCount}>{comments}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="md-repeat" size={20} onPress={handleRetweetPress} />
            <Text style={styles.badgeCount}>{retweets}</Text>
          </View>
          <View style={styles.iconContainer}>
            {liked && (
              <Icon
                name="ios-heart"
                size={20}
                color="red"
                onPress={handleLikeButtonPress}
              />
            )}
            {!liked && (
              <Icon
                name="ios-heart-empty"
                size={20}
                onPress={handleLikeButtonPress}
              />
            )}
            <Text style={styles.badgeCount}>{likeCounter}</Text>
          </View>
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
    fontSize: 17,
    fontFamily: 'arial',
  },
  tweet: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 15,
    borderBottomColor: '#E4E4E4',
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
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
    elevation: 1,
  },
  badgeCount: {
    fontSize: 16,
    paddingLeft: 8,
  },
});
