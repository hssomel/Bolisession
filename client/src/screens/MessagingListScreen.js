import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import firebase from 'react-native-firebase';

export default function MessagingListScreen(props) {
  // Initial State
  const [user, setUser] = useState(null);
  const [usersData, setUsersData] = useState(null);

  // Firebase References
  const usersRef = firebase
    .database()
    .ref('people/')
    .child('users');

  // Event Handlers
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    const usersArray = [];
    const query = usersRef.limitToLast(100);
    query
      .once('value', snapshot => {
        snapshot.forEach(data => {
          usersArray.push(data);
        });
      })
      .then(() => {
        setUsersData(usersArray.reverse());
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
          onPress={this.testChatPress}
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
