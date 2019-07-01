import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
// import HeartRed from '../components/heartRed';

export default function UserProfileScreen(props) {
  // Initial State
  const [feedData, setFeedData] = useState([]);
  const [user, setUser] = useState(null);
  const [hasLiked, setHasLiked] = useState(null);
  //Initial database references
  const postsRef = firebase.database().ref('posts/');
  const verifyRef = firebase
    .database()
    .ref('people/')
    .child('users');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      verifyRef
        .orderByChild('userID')
        .equalTo(user.uid)
        .once('value', snapshot => {
          setUser(user);
        });
    });
    console.log('useEffect triggered on UserProfileScreen onAuthStateChanged');

    return () => {
      if (unsubscribe) unsubscribe();
      console.log('listener unmounted from userProfile screen');
    };
  }, []);

  useEffect(() => {
    console.log('useEffect triggered by getItems()');
    getItems();
  }, []);

  // function called to get all posts
  const getItems = () => {
    const twitPosts = [];
    const query = postsRef.limitToLast(100);
    query
      .once('value', snapshot => {
        snapshot.forEach(data => {
          twitPosts.push(data);
        });
      })
      .then(() => {
        setFeedData(twitPosts.reverse());
      });
  };

  // function called when user likes a post
  const handleLikePress = (item, key) => {
    const userLikedRef = postsRef.child(key).child('usersLiked');

    userLikedRef
      .orderByChild('user_name')
      .equalTo(user.displayName)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          // means user has not liked post
          console.log('user has not liked post so we will like it');
          increaseLikeByOne(key);
          addUserToLikesArray(key);
          setHasLiked(true);
        } else {
          decreaseLikeByOne(key);
          removeUserFromLikesArray(key);
          console.log('user has aleady liked post');
          setHasLiked(false);
        }
      });
  };

  const increaseLikeByOne = key => {
    const increaseLikeRef = postsRef.child(key).child('likes');
    increaseLikeRef.transaction(current_value => {
      return (current_value || 0) + 1;
    });
  };

  const decreaseLikeByOne = key => {
    const decreaseLikeRef = postsRef.child(key).child('likes');
    decreaseLikeRef.transaction(current_value => {
      return (current_value || 0) - 1;
    });
  };

  const addUserToLikesArray = key => {
    const addUserRef = postsRef.child(key).child('usersLiked');
    addUserRef
      .push({
        user_name: user.displayName,
      })
      .then(data => {
        console.log('successfully added ');
      })
      .catch(error => {
        console.log('error ', error);
      });
  };

  const removeUserFromLikesArray = key => {
    const removeUserRef = postsRef
      .child(key)
      .child('usersLiked')
      .orderByChild('user_name')
      .equalTo(user.displayName);

    removeUserRef
      .remove()
      .then(data => {
        console.log('successfully removed ');
      })
      .catch(error => {
        console.log('error ', error);
      });
  };

  function HeartRed(props) {
    const { item, user, liked } = props;
    let snap = true;

    const heartRef = postsRef
      .child(item.key)
      .child('usersLiked')
      .orderByChild('user_name')
      .equalTo(user.displayName);

    heartRef.once('value', snapshot => {
      if (!snapshot.val()) {
        snap = false;
        console.log('SNAP SHOULD BE FALSE');
        return <HeartReddd snap={snap} item={item} />;
      } else {
        snap = true;
        console.log('SNAP SHOULD BE TRUE');
        return <HeartReddd snap={snap} item={item} />;
      }
    });

    // useEffect(() => {
    //   heartRef.once(
    //     'value',
    //     snapshot => {
    //       if (!snapshot.val()) {
    //         snap = false;
    //         return <HeartReddd snap={snap} item={item} />;
    //         // console.log('SNAP SHOULD BE TRUE');
    //       }
    //     },
    //     [],
    //   );
    // });
    console.log('we rendered this component');
    return <HeartReddd snap={snap} item={item} />;
  }

  function HeartReddd(props) {
    const { snap, item } = props;

    if (snap) {
      return (
        <Icon
          name="ios-heart-empty"
          size={20}
          color="red"
          onPress={() => handleLikePress(item, item.key)}
        />
      );
    }

    return <Text>Hello world</Text>;
  }

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={{ justifyContent: 'flex-start' }}>
        <FlatList
          data={feedData}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <View style={styles.tweet}>
              <View style={styles.firstContainer}>
                <TouchableHighlight underlayColor="white" activeOpacity={0.75}>
                  <View>
                    <Avatar
                      source={{
                        uri: item._value.userPhoto,
                      }}
                      rounded
                      size={60}
                    />
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.secondaryContainer}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.usernameText}>
                    {item._value.username}
                  </Text>
                </View>
                <View style={styles.tweetBodyContainer}>
                  <Text style={styles.tweetText}>{item._value.text}</Text>
                </View>
                <View style={styles.footerContainer}>
                  <TouchableHighlight>
                    <View style={styles.iconContainer}>
                      <Icon name="md-chatboxes" size={20} />
                      <Text style={styles.badgeCount}>
                        {item._value.comments}
                      </Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight>
                    <View style={styles.iconContainer}>
                      <Icon name="md-repeat" size={20} />
                      <Text style={styles.badgeCount}>
                        {item._value.retweets}
                      </Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight>
                    <View style={styles.iconContainer}>
                      {/* <HeartRed item={item} user={user} liked={hasLiked} /> */}
                      <Text style={styles.badgeCount}>{item._value.likes}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#8acafe',
  },
  secondaryContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 5,
    // backgroundColor: '#cccccc',
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
    // flex: 1,
  },
  tweetText: {
    marginTop: 1,
    fontSize: 17,
    color: '#555',
  },
  tweetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    backgroundColor: '#ff3333',
  },
  usernameContainer: {
    // backgroundColor: '#ff7f50', // light orange
    height: '100%',
    width: '100%',
    flex: 1,
  },
  tweetBodyContainer: {
    // backgroundColor: '#00ff00', // lime green
    height: '100%',
    width: '100%',
    flex: 1,
  },
  footerContainer: {
    // backgroundColor: 'red',
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
    // backgroundColor: 'purple',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  badgeCount: {
    fontSize: 16,
    paddingLeft: 7,
  },
});
