import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import {
  generateThreadKey,
  verifyIfThreadExists,
  getUsers,
} from '../actions/messagingActions';

export default function MessagingListScreen(props) {
  // Initial State
  const [user, setUser] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [usersDataCopy, setUsersDataCopy] = useState(null);
  const [search, setSearch] = useState(null);
  // Event Handlers
  const SearchFilterFunction = text => {
    const newData = usersDataCopy.filter(item => {
      //applying filter for the inserted text in search bar
      const itemData = item._value.username
        ? item._value.username.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setUsersData(newData);
    setSearch(text);
  };

  const onAvatarPress = item => {
    generateThreadKey(user, item._value)
      .then(res => {
        verifyIfThreadExists(user, res, item._value, props);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      getUsers(user)
        .then(data => {
          setUsersData(data);
          setUsersDataCopy(data);
        })
        .catch(err => {
          console.log(err);
        });
    });

    return () => {
      if (unsubscribe) unsubscribe();
      console.log('unmounted from MessagingList Screen');
    };
  }, []);

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'white',
        }}
      />
    );
  };

  return (
    <View style={styles.viewStyle}>
      <SearchBar
        round
        searchIcon={{
          size: 28,
          color: 'black',
          paddingLeft: 5,
        }}
        onChangeText={text => SearchFilterFunction(text)}
        placeholder="Search Users..."
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchInputContainer}
      />
      <FlatList
        style={styles.listcontainer}
        data={usersData}
        renderItem={({ item }) => (
          <ListItem
            title={`${item._value.username}`}
            titleStyle={{ fontSize: 17, color: '#546060' }}
            leftAvatar={{
              rounded: true,
              source: { uri: item._value.profilePhoto },
              size: 60,
              marginLeft: 5,
            }}
            onPress={() => onAvatarPress(item)}
            containerStyle={{ borderBottomWidth: 0, paddingVertical: 7.5 }}
          />
        )}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
  },
  listContainer: {
    width: '100%',
  },
  searchBarContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderTopColor: 'white',
    borderBottomColor: 'white',
    paddingTop: 5,
    marginBottom: 5,
    elevation: 2,
  },
  searchInputContainer: {
    backgroundColor: 'white',
  },
});
