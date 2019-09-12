import firebase from 'react-native-firebase';
// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');
const postsRef = firebase.database().ref('posts/');

// Increases clients following list when they follow another user
export const increaseFollowingList = async (key, name) => {
  try {
    const ref = usersRef.child(key);
    await ref.child('following').push({
      user_name: name,
    });

    ref.child('followingCount').transaction(currentVal => {
      return (currentVal || 0) + 1;
    });
  } catch (err) {
    console.warn(err);
  }
};

// Decreases clients following list when they unfollow another user
export const decreaseFollowingList = async (key, name) => {
  try {
    const ref = usersRef.child(key).child('following');
    const snapshot = await ref
      .orderByChild('user_name')
      .equalTo(name)
      .once('value');

    await snapshot.forEach(data => {
      ref.child(data.key).remove();
    });

    const decreaseRef = usersRef.child(key).child('followingCount');
    decreaseRef.transaction(currentVal => {
      return (currentVal || 0) - 1;
    });
  } catch (err) {
    console.warn(err);
  }
};

// The user that the client follows has their follower list increase
export const increaseFollowerList = async (key, name) => {
  try {
    const ref = usersRef.child(key);
    await ref.child('followers').push({
      user_name: name,
    });

    const increaseFollowersRef = ref.child('followersCount');
    increaseFollowersRef.transaction(currentVal => {
      return (currentVal || 0) + 1;
    });
  } catch (err) {
    console.warn(err);
  }
};

// The user that the client unfollows has their follower list decrease
export const decreaseFollowersList = async (key, name) => {
  try {
    const ref = usersRef.child(key).child('followers');
    const snapshot = await ref
      .orderByChild('user_name')
      .equalTo(name)
      .once('value');

    await snapshot.forEach(data => {
      ref.child(data.key).remove();
    });

    const decreaseRef = usersRef.child(key).child('followersCount');
    decreaseRef.transaction(currentVal => {
      return (currentVal || 0) - 1;
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function called by Post(Tweet) Component when user likes a post
export const addUserToLikesArray = async (key, name) => {
  try {
    const ref = postsRef.child(key);
    await ref.child('usersLiked').push({
      user_name: name,
    });
    // Increasing Like Count
    ref.child('likes').transaction(currentVal => {
      return (currentVal || 0) + 1;
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function called by Post(Tweet) Component when user unlikes a post
export const removeUserFromLikesArray = async (key, name) => {
  try {
    const removeRef = postsRef.child(key).child('usersLiked');
    const snapshot = await removeRef
      .orderByChild('user_name')
      .equalTo(name)
      .once('value');

    await snapshot.forEach(data => {
      removeRef.child(data.key).remove();
    });

    const ref = postsRef.child(key).child('likes');
    ref.transaction(currentVal => {
      return (currentVal || 0) - 1;
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function to check if user has liked a post
export const checkForLikes = async (item, user) => {
  try {
    const snapshot = await postsRef
      .child(item.key)
      .child('usersLiked')
      .orderByChild('user_name')
      .equalTo(user.displayName)
      .once('value');

    // snapshot.val() is null if user has not liked post
    return snapshot.val();
  } catch (err) {
    console.warn(err);
  }
};

// Function to upload youtube video URL & startTime to database
export const uploadProfileVid = (key, url, startTime) => {
  const ref = usersRef.child(key);

  ref
    .update({
      youtubeURL: url,
      startTime,
    })
    .then(data => {
      console.log('data ', data);
    })
    .catch(error => {
      console.log('error ', error);
    });
};

// Function triggered when client posts a new tweet
export const writeUserData = (tweet, user) => {
  postsRef
    .push({
      text: tweet,
      username: user.displayName,
      profilePhoto: user.photoURL,
      likes: 0,
      comments: 0,
      retweets: 0,
      usersLiked: {},
    })
    .then(data => {
      console.log('data ', data);
    })
    .catch(error => {
      console.log('error ', error);
    });
};
