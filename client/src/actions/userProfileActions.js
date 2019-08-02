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

export const uploadImageToFirebase = (image, user, dataKey) => {
  return new Promise((resolve, reject) => {
    const storeImageRef = firebase.storage().ref(`images/${user.uid}`);
    storeImageRef
      .put(image.path, { contentType: 'image/jpeg' })
      .then(snapshot => {
        console.log(JSON.stringify(snapshot.metadata));
        storeImageRef
          .getDownloadURL()
          .then(url => {
            updateUserImage(url, user, dataKey);
            resolve(true);
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

const updateUserImage = (url, user, dataKey) => {
  const verifyRef = firebase
    .database()
    .ref('people/')
    .child('users/' + dataKey);
  user
    .updateProfile({
      photoURL: url,
    })
    .then(() => {
      verifyRef
        .update({
          profilePhoto: url,
        })
        .then(data => {
          console.log('data ', data);
        })
        .catch(error => {
          console.log('error ', error);
        });
    })
    .catch(err => {
      console.log(err);
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

export const navigateToIncomplete = (user, props) => {
  usersRef
    .orderByChild('userID')
    .equalTo(user.uid)
    .once('value', snapshot => {
      snapshot.forEach(data => {
        if (!user.displayName) {
          props.navigation.navigate('Create', {
            user,
            dataKey: data.key,
          });
        } else {
          props.navigation.navigate('ProfilePhoto', {
            user,
            dataKey: data.key,
          });
        }
      });
    });
};

export const confirmUserExists = (user, props) => {
  return new Promise(resolve => {
    usersRef
      .orderByChild('userID')
      .equalTo(user.uid)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
  });
};
