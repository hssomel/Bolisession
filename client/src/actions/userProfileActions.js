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
      username: name,
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
      .orderByChild('username')
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
      username: name,
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
      .orderByChild('username')
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
      username: name,
    });

    // Increasing like count
    await ref.child('likes').transaction(currentVal => {
      console.log('hit 81');
      return (currentVal || 0) + 1;
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function called by Post.js when user unlikes a post
export const removeUserFromLikesArray = async (key, name) => {
  try {
    const removeRef = postsRef.child(key).child('usersLiked');
    const snapshot = await removeRef
      .orderByChild('username')
      .equalTo(name)
      .once('value');

    await snapshot.forEach(data => {
      removeRef.child(data.key).remove();
    });

    const ref = postsRef.child(key).child('likes');
    await ref.transaction(currentVal => {
      const val = (currentVal || 0) - 1;
      return val;
    });
  } catch (err) {
    console.warn(err);
  }
};

// Function to check if user has liked a post
// Function used in component: Post.js
export const checkForLikes = async (key, name) => {
  try {
    const ref = postsRef
      .child(key)
      .child('usersLiked')
      .orderByChild('username')
      .equalTo(name);
    const snapshot = await ref.once('value');
    return snapshot.val();
  } catch (err) {
    console.warn(err);
  }
};

// Function checks if Client is following the other user
// Function called by FollowSwitch.js
export const checkIfFollowing = async (profilekey, username) => {
  try {
    const snapshot = await usersRef
      .child(profilekey)
      .child('followers')
      .orderByChild('username')
      .equalTo(username)
      .once('value');
    // if Client is not following other user the return is null
    return snapshot.val();
  } catch (err) {
    console.warn(err);
  }
};

export const onFollowSwitchChange = (
  value,
  userkey,
  username,
  profilekey,
  clientName,
) => {
  if (!value) {
    decreaseFollowingList(userkey, username);
    decreaseFollowersList(profilekey, clientName);
  } else {
    increaseFollowingList(userkey, username);
    increaseFollowerList(profilekey, clientName);
  }
};
