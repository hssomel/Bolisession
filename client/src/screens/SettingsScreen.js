import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import YouTube from 'react-native-youtube';

export default function SettingsScreen(props) {
  // Intial State
  const [user, setUser] = useState(null);
  const [youtubeRef, setYoutubeRef] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [isLoop, setIsLoop] = useState(false);
  // Firebase References
  const postsRef = firebase.database().ref('posts/');
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users/');

  //Event Handlers
  useEffect(() => {
    console.log('useEffect triggered');
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const removeFromUsersDB = () => {
    usersRef
      .orderByChild('username')
      .equalTo(user.displayName)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          const removeRef = usersRef.child(data.key);
          removeRef
            .remove()
            .then(() => {
              removeFromPostsDB();
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
  };

  const removeFromPostsDB = () => {
    postsRef
      .orderByChild('username')
      .equalTo(user.displayName)
      .once('value', snapshot => {
        snapshot.forEach(data => {
          const removeRef = postsRef.child(data.key);
          removeRef
            .remove()
            .then(() => {})
            .catch(err => {
              console.log(err);
            });
        });
        deleteUser();
      });
  };

  const deleteUser = () => {
    user
      .delete()
      .then(() => {
        props.navigation.navigate('phone');
      })
      .catch(err => {
        console.log(err);
        signOut();
      });
  };

  const signOut = () => {
    firebase.auth().signOut();
    props.navigation.navigate('phone');
  };

  const customFunction = () => {
    console.log('custom function');
    youtubeRef
      .currentTime()
      .then(res => {
        setCurrentTime({ res });
        console.log('currentTime', { res });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const customFunction2 = () => {
    console.log('custom function222');
    setIsLoop(true);
    youtubeRef
      .currentTime()
      .then(res => {
        setCurrentTime({ res });
        console.log('res', { res });
        customFunction3();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const customFunction3 = () => {
    console.log('custom function3');
    setIsLoop(true);
    youtubeRef.seekTo(2);
  };

  return (
    <View style={styles.container}>
      <YouTube
        ref={component => {
          _youTubeRef = component;
          setYoutubeRef(component);
        }}
        apiKey=""
        videoId="2GFeHRlJf1A"
        play={true}
        loop={isLoop}
        fullscreen={true}
        controls={1}
        style={{ height: '30%', width: '85%' }}
        // onError={e => this.setState({ error: e.error })}
        onReady={customFunction}
        // onChangeState={e => this.setState({ status: e.state })}
        // onChangeQuality={e => this.setState({ quality: e.quality })}
        onChangeFullscreen={e => customFunction(e)}
      />

      <TouchableOpacity style={styles.deleteButton} onPress={removeFromUsersDB}>
        <Text style={styles.ButtonText}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={customFunction2}>
        <Text style={styles.ButtonText}>Console log</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  deleteButton: {
    height: 45,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 20,
    borderColor: 'red',
    borderWidth: 2,
  },
  ButtonText: {
    color: '#808B96',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
});
