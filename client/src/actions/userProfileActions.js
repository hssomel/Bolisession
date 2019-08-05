import firebase from 'react-native-firebase';
// Firebase references
const usersRef = firebase
  .database()
  .ref('people/')
  .child('users');
const postsRef = firebase.database().ref('posts/');

export const increaseFollowingList = (key, name) => {
  const ref = usersRef.child(key);
  ref
    .child('following')
    .push({
      user_name: name,
    })
    .then(() => {
      ref.child('followingCount').transaction(currentVal => {
        return (currentVal || 0) + 1;
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const decreaseFollowingList = (key, name) => {
  const ref = usersRef.child(key).child('following');
  ref
    .orderByChild('user_name')
    .equalTo(name)
    .once('value', snapshot => {
      snapshot.forEach(data => {
        ref
          .child(data.key)
          .remove()
          .then(() => {
            const decreaseRef = usersRef.child(key).child('followingCount');
            decreaseRef.transaction(currentVal => {
              return (currentVal || 0) - 1;
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
};

export const increaseFollowerList = (key, name) => {
  const ref = usersRef.child(key);
  ref
    .child('followers')
    .push({
      user_name: name,
    })
    .then(() => {
      const increaseFollowersRef = ref.child('followersCount');
      increaseFollowersRef.transaction(currentVal => {
        return (currentVal || 0) + 1;
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const decreaseFollowersList = (key, name) => {
  const ref = usersRef.child(key).child('followers');
  ref
    .orderByChild('user_name')
    .equalTo(name)
    .once('value', snapshot => {
      snapshot.forEach(data => {
        ref
          .child(data.key)
          .remove()
          .then(() => {
            const decreaseRef = usersRef.child(key).child('followersCount');
            decreaseRef.transaction(currentVal => {
              return (currentVal || 0) - 1;
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
};

const increaseLikeCount = key => {
  const ref = postsRef.child(key).child('likes');
  ref.transaction(currentVal => {
    return (currentVal || 0) + 1;
  });
};

const decreaseLikeCount = key => {
  const ref = postsRef.child(key).child('likes');
  ref.transaction(currentVal => {
    return (currentVal || 0) - 1;
  });
};

export const addUserToLikesArray = (key, name) => {
  const ref = postsRef.child(key);
  ref
    .child('usersLiked')
    .push({
      user_name: name,
    })
    .then(() => {
      increaseLikeCount(key);
    })
    .catch(error => {
      console.log('error ', error);
    });
};

export const removeUserFromLikesArray = (key, name) => {
  const removeUserRef = postsRef.child(key).child('usersLiked');
  removeUserRef
    .orderByChild('user_name')
    .equalTo(name)
    .once('value', snapshot => {
      snapshot.forEach(data => {
        removeUserRef
          .child(data.key)
          .remove()
          .then(() => {
            decreaseLikeCount(key);
          })
          .catch(error => {
            console.log('error ', error);
          });
      });
    });
};

// Function to update firebase db with url to profile pic
const uploadUserImagetoDB = (url, user, dataKey) => {
  return new Promise((resolve, reject) => {
    const verifyRef = usersRef.child(dataKey);
    user
      .updateProfile({
        photoURL: url,
      })
      .then(() => {
        verifyRef
          .update({
            profilePhoto: url,
          })
          .then(() => {
            console.log('successfully uploaded');
            resolve();
          })
          .catch(error => {
            console.log('error ', error);
            reject(new Error('unsuccessful upload'));
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

export const uploadImageToFirebaseStorage = (image, user, dataKey) => {
  return new Promise((resolve, reject) => {
    const storeImageRef = firebase.storage().ref(`images/${user.uid}`);

    storeImageRef
      .put(image.path, { contentType: 'image/jpeg' })
      .then(() => {
        storeImageRef
          .getDownloadURL()
          .then(url => {
            uploadUserImagetoDB(url, user, dataKey)
              .then(() => {
                resolve();
              })
              .catch(err => {
                console.log(err);
                reject();
              });
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

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

export const writeUserData = (tweet, user) => {
  postsRef
    .push({
      text: tweet,
      username: user.displayName,
      userPhoto: user.photoURL,
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
