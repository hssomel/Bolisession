import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import { getPostsByProfile, setProfileOnScreen } from '../actions/postActions';
import {
  addUserToLikesArray,
  removeUserFromLikesArray,
  checkForLikes,
} from '../actions/userProfileActions';

const Post = ({
  data,
  postkey,
  user,
  user: { username },
  setProfileOnScreen,
  getPostsByProfile,
  navigation,
}) => {
  // Destructuring props
  const { author, text, profilePhoto, comments, retweets, likes } = data;
  // Initial State
  const [liked, setHasLiked] = useState(null);
  const [likeCounter, setLikeCounter] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  // Event Handlers
  const hasUserLikedPost = async () => {
    // issue is we are not refreshing redux
    const initalLike = await checkForLikes(postkey, username);
    setHasLiked(initalLike);
    setLikeCounter(likes);
    setIsLoaded(true);
  };

  const handleLikeButtonPress = async () => {
    let counter;
    if (liked) {
      setHasLiked(null);
      counter = likeCounter - 1;
      await removeUserFromLikesArray(postkey, username);
    } else {
      setHasLiked(true);
      counter = likeCounter + 1;
      await addUserToLikesArray(postkey, username);
    }
    setLikeCounter(counter);
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

  const onAvatarPress = async () => {
    await getPostsByProfile(author);
    await setProfileOnScreen(user, author);
    navigation.navigate('Profile');
  };

  useEffect(() => {
    // Check if client has liked the post
    hasUserLikedPost();
  }, [likes]);

  return (
    <View>
      {isLoaded && (
        <View style={styles.container}>
          <View style={styles.firstContainer}>
            <TouchableHighlight underlayColor="white" activeOpacity={0.75}>
              <View>
                <Avatar
                  source={{
                    uri: profilePhoto,
                  }}
                  rounded
                  size={60}
                  onPress={onAvatarPress}
                />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.secondaryContainer}>
            <Text style={styles.usernameText}>{'@' + author}</Text>
            <Text style={styles.tweetText}>{text}</Text>
            <View style={styles.footerContainer}>
              <View style={styles.iconContainer}>
                <Icon
                  name="md-chatboxes"
                  size={20}
                  onPress={handleRetweetPress}
                />
                <Text style={styles.badgeCount}>{comments}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon name="md-repeat" size={20} onPress={handleRetweetPress} />
                <Text style={styles.badgeCount}>{retweets}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon
                  name="ios-heart"
                  size={20}
                  color={liked ? 'red' : null}
                  onPress={handleLikeButtonPress}
                />
                <Text style={styles.badgeCount}>{likeCounter}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

Post.propTypes = {
  user: PropTypes.object.isRequired,
  getPostsByProfile: PropTypes.func.isRequired,
  setProfileOnScreen: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { getPostsByProfile, setProfileOnScreen },
)(withNavigation(Post));

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 15,
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  firstContainer: {
    flex: 1,
    alignItems: 'center',
  },
  secondaryContainer: {
    flex: 5,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  usernameText: {
    fontSize: 17,
    fontFamily: 'arial',
  },
  tweetText: {
    marginTop: 1,
    fontSize: 17,
    color: 'black',
    paddingLeft: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 10,
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    elevation: 1,
  },
  badgeCount: {
    fontSize: 16,
    paddingLeft: 8,
  },
});
