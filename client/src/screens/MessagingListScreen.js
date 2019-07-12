import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default function MessagingListScreen(props) {
  // Initial State
  const [user, setUser] = useState(null);
  const [usersData, setUsersData] = useState(null);
  // Firebase References
  const messageRef = firebase.database().ref('messages/');
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users');

  // Event Handlers
  const getUsers = user => {
    const usersArray = [];
    const query = usersRef.limitToLast(100);
    query
      .once('value', snapshot => {
        snapshot.forEach(data => {
          if (data._value.username != user.displayName) {
            usersArray.push(data);
          }
        });
      })
      .then(() => {
        setUsersData(usersArray.reverse());
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      getUsers(user);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const generateThreadKey = item => {
    return new Promise((resolve, reject) => {
      const string1 = user.uid.toString();
      const string2 = item._value.userID.toString();

      if (string1 < string2) {
        const idVal = string1.concat(string2);
        resolve(idVal);
      } else {
        const idVal = string2.concat(string1);
        resolve(idVal);
      }
    });
  };

  const verifyIfThreadExists = (threadID, item) => {
    messageRef
      .orderByChild('_threadID')
      .equalTo(threadID)
      .once('value', snapshot => {
        if (!snapshot.val()) {
          messageRef
            .push({ _threadID: threadID, messages: {} })
            .then(data => {
              props.navigation.navigate('PrivateMessage', {
                item: item,
                user: user,
                threadID: threadID,
                threadKey: data.key,
              });
            })
            .catch(err => {
              console.log('error', err);
            });
        } else {
          props.navigation.navigate('PrivateMessage', {
            item: item,
            user: user,
            threadID: threadID,
          });
        }
      });
  };

  const onIconPress = item => {
    generateThreadKey(item)
      .then(res => {
        verifyIfThreadExists(res, item);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
    <FlatList
      style={styles.listcontainer}
      data={usersData}
      renderItem={({ item }) => (
        <ListItem
          title={`${item._value.username}`}
          leftAvatar={{
            rounded: true,
            source: { uri: item._value.profilePhoto },
          }}
          onPress={() => onIconPress(item)}
          containerStyle={{ borderBottomWidth: 0 }}
        />
      )}
      keyExtractor={item => item.key}
      ItemSeparatorComponent={renderSeparator}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
});
