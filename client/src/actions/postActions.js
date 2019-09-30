import firebase from 'react-native-firebase';
import {
  GET_ALL_POSTS,
  GET_POSTS_BY_PROFILE,
  SET_PROFILE_KEY,
  SET_PROFILE_ON_PROFILESCREEN,
  CLEAR_PROFILE_SCREEN,
} from './actionTypes';

// Firebase references
const postsRef = firebase.database().ref('posts/');
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');

// Function used in: HomeScreen.js
export const getAllPosts = () => async dispatch => {
  try {
    const posts = [];
    const snapshot = await postsRef.limitToLast(25).once('value');

    snapshot.forEach(data => {
      posts.push(data);
    });

    dispatch({
      type: GET_ALL_POSTS,
      payload: posts.reverse(),
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: UserProfileScreen.js
export const getPostsByProfile = name => async dispatch => {
  try {
    const posts = [];
    const snapshot = await postsRef
      .orderByChild('author')
      .equalTo(name)
      .once('value');

    snapshot.forEach(data => {
      posts.push(data);
    });

    dispatch({
      type: GET_POSTS_BY_PROFILE,
      payload: posts.reverse(),
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: HomeFeedHeader.js
export const postTweet = async (tweet, user) => {
  try {
    const { username, profilePhoto } = user;
    await postsRef.push({
      text: tweet,
      author: username,
      profilePhoto,
      likes: 0,
      comments: 0,
      retweets: 0,
      usersLiked: {},
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function used in: Post.js & UserProfileScreen.js
// Function used to determine if client's profile or another user's profile
// should be shown when hitting route: UserProfileScreen
export const setProfileOnScreen = (user, author) => async dispatch => {
  try {
    const { username } = user;
    if (username == author || !author) {
      dispatch({
        type: SET_PROFILE_ON_PROFILESCREEN,
        payload: user,
      });
      return true;
    }

    const data = await usersRef
      .orderByChild('username')
      .equalTo(author)
      .once('value');
    const key = data._childKeys[0];

    dispatch({
      type: SET_PROFILE_KEY,
      payload: key,
    });

    const rawData = await usersRef.child(key).once('value');
    const profileData = rawData.val();

    dispatch({
      type: SET_PROFILE_ON_PROFILESCREEN,
      payload: profileData,
    });
  } catch (err) {
    console.warn(err);
  }
};

export const clearProfile = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_PROFILE_SCREEN,
      payload: null,
    });
  } catch (err) {
    console.warn(err);
  }
};
