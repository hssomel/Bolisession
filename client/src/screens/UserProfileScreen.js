import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import ProfileFeedHeader from '../components/ProfileFeedHeader';
import UserProfileFeed from '../components/UserProfileFeed';

export default function UserProfileScreen(props) {
  // Initial State
  const [thisUser, setUser] = useState(null);
  const [UserOfPost] = useState(props.navigation.getParam('item', null));
  const [UserOfPostName] = useState(props.navigation.getParam('name', null));
  const [isLoaded, setIsLoaded] = useState(false);
  const [switchValue, setSwitchValue] = useState(null);
  const [currentUserKey, setCurrentUserParentKey] = useState(null);
  // Firebase references
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users');

  // Event Handlers
  const initialSwitchValue = key => {
    return new Promise((resolve, reject) => {
      usersRef
        .child(key)
        .child('following')
        .orderByChild('user_name')
        .equalTo(UserOfPostName)
        .once('value', snapshot => {
          if (!snapshot.val()) {
            setSwitchValue(false);
            resolve();
          } else {
            setSwitchValue(true);
            resolve();
          }
        });
    });
  };

  const increaseFollowingByOne = key => {
    const increaseFollowingRef = usersRef.child(key).child('following');
    increaseFollowingRef.transaction(currentVal => {
      return (currentVal || 0) + 1;
    });
  };

  const decreaseFollowingByOne = key => {
    const decreaseFollowingRef = usersRef.child(key).child('following');
    decreaseFollowingRef.transaction(currentVal => {
      return (currentVal || 0) - 1;
    });
  };

  const increaseFollowing = () => {
    usersRef
      .child(currentUserKey)
      .child('following')
      .push({
        user_name: UserOfPostName,
      })
      .then(() => {
        increaseFollowingByOne(currentUserKey);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const decreaseFollowing = () => {
    const removeUserRef = usersRef.child(currentUserKey).child('following');
    removeUserRef
      .orderByChild('user_name')
      .equalTo(UserOfPostName)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          const finalRemoveRef = removeUserRef.child(data.key);
          finalRemoveRef
            .remove()
            .then(() => {
              decreaseFollowingByOne(currentUserKey);
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
  };

  const toggleSwitch = value => {
    setSwitchValue(value);
    if (!value) {
      decreaseFollowing();
    } else {
      increaseFollowing();
    }
  };

  const getCurrentUserParentKey = user => {
    return new Promise((resolve, reject) => {
      usersRef
        .orderByChild('userID')
        .equalTo(user.uid)
        .once('value', snapshot => {
          snapshot.forEach(data => {
            setCurrentUserParentKey(data.key);
            resolve(data.key);
          });
        });
    });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      getCurrentUserParentKey(user)
        .then(res => {
          if (UserOfPost) {
            initialSwitchValue(res)
              .then(() => {
                setIsLoaded(true);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            setIsLoaded(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <View>
      <View>
        {!isLoaded && (
          <View style={{ justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="orangered" />
          </View>
        )}
        {isLoaded && (
          <View>
            <UserProfileFeed
              UserOfPost={UserOfPost}
              ListHeaderComponent={
                <ProfileFeedHeader
                  UserOfPost={UserOfPost}
                  user={thisUser}
                  toggleSwitch={toggleSwitch}
                  switchValue={switchValue}
                />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
