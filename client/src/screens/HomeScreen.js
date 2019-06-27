import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button, Avatar } from 'react-native-elements';

import firebase from 'react-native-firebase';

export default function HomeScreen(props) {
  // Initial State
  const [tweet, setTweet] = useState('');
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const verifyRef = firebase
      .database()
      .ref('people/')
      .child('users');

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      verifyRef
        .orderByChild('userID')
        .equalTo(user.uid)
        .once('value', snapshot => {
          if (!snapshot.val()) {
            console.log('no existing user.. signing out');
            signOut();
          } else {
            setUser(user);
            console.log('currently signed in user: ', user.displayName);
          }
        });
      setProfilePhoto(user.photoURL);
    });

    return () => {
      if (unsubscribe) unsubscribe();
      console.log('firebase listener unmounted from home screen');
    };
  });

  const signOut = () => {
    firebase.auth().signOut();
    console.log('Signed Out !');
    props.navigation.navigate('phone');
  };

  const writeUserData = () => {
    firebase
      .database()
      .ref('posts/')
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
        //success callback
        console.log('data ', data);
      })
      .catch(error => {
        //error callback
        console.log('error ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <Text style={styles.text}>This will be future feed!</Text>

      <Button
        title="Sign Out"
        color="red"
        onPress={signOut}
        style={styles.button}
      />
      <TextInput
        placeholder="Body of tweet"
        style={styles.textInput}
        onChangeText={input => setTweet(input)}
      />
      <Button
        title="Upload data"
        color="red"
        onPress={writeUserData}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'pink',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  button: {
    marginTop: '8%',
  },
  textInput: {
    marginTop: '15%',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    fontSize: 20,
    width: '83%',
    paddingBottom: '-1%',
  },
});

// {
//   "rules": {
//     // All data is readable by anyone.
//     ".read": true,
//     "people": {
//       // A list of users with their names on the site.
//       "$userid": {
//         // Only the user can write their own entry into this list.
//         ".write": "$userid ==auth.uid"
//       }
//     },
//     "users": {
//       "$userid": {
//         // The user is allowed to write everything in their bucket.
//         ".write": "$userid ==auth.uid",
//         "following": {
//           // The following list should only contain actual ids from the "people" list.
//           "$followingid": {
//             ".validate": "root.child('people').hasChild($followingid)"
//           }
//         },
//         "followers": {
//           // Anyone can add themself to to this user's followers list.
//           "$followerid": {
//             ".write": "$followerid ==auth.uid"
//           }
//         },
//         "feed": {
//           "$sparkid": {
//             // User A can write in user B's feed, but only if A is following B, and only for sparks for which they are the author.
//             ".write": "root.child('users/' + $userid + '/following').hasChild(auth.uid) && root.child('sparks/' + $sparkid + '/author').val() ==auth.uid"
//           }
//         }
//       }
//     },
//     "sparks": {
//       // A global list of sparks (the "firehose").
//       "$sparkid": {
//         // Modifying an existing spark is not allowed.
//         ".write": "!data.exists()",
//         // Every spark should have an author and a body.
//         ".validate": "newData.hasChildren(['author', 'content'])",
//         // A user can attribute a spark only to themselves.
//         "author": {
//           ".validate": "newData.val() ==auth.uid"
//         },
//         "content": {
//           ".validate": "newData.isString()"
//         }
//       }
//     },
//     "recent-users": {
//       // Users can add themselves to the list of users with recent activity.
//       "$userid": {
//         ".write": "$userid ==auth.uid"
//       }
//     },
//     "recent-sparks": {
//       // Authors of sparks can add their sparks to this list.
//       "$sparkid": {
//         ".write": "root.child('sparks/' + $sparkid + '/author').val() ==auth.uid"
//       }
//     },
//     "search": {
//       "firstName": {
//         "$searchKey": {
//           ".write": "auth != null && (root.child('people/' +auth.uid + '/firstName').val() + '|' + root.child('people/' +auth.uid + '/lastName').val() + '|' +auth.uid) == $searchKey && newData.val() ==auth.uid"
//         }
//       },
//       "lastName": {
//         "$searchKey": {
//           ".write": "auth != null && (root.child('people/' +auth.uid + '/lastName').val() + '|' + root.child('people/' +auth.uid + '/firstName').val() + '|' +auth.uid) == $searchKey && newData.val() ==auth.uid"
//         }
//       }
//     }
//   }
// }
