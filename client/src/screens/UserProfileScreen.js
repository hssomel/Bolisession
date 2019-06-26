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
import { Button, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UserProfileScreen(props) {
  // Initial State
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    const twitPosts = [];
    const query = firebase
      .database()
      .ref('posts/')
      .orderByKey();
    query
      .once('value', snapshot => {
        snapshot.forEach(data => {
          twitPosts.push(data);
        });
      })
      .then(() => {
        setFeedData(twitPosts);
      });
  };

  const handlePress = () => {
    console.log(feedData);
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
                        uri: 'http://www.gravatar.com/avatar/?d=identicon',
                      }}
                      rounded
                      size={50}
                    />
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.secondaryContainer}>
                <Text style={styles.usernameText}>{item._value.username}</Text>
                <Text style={styles.tweetText}>{item._value.text}</Text>
                <View style={styles.tweetFooter}>
                  <View style={styles.footerIcons}>
                    <TouchableHighlight>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Icon name="md-chatboxes" size={18} />
                        <Text style={styles.badgeCount}>14</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.footerIcons}>
                    <TouchableHighlight>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Icon name="md-repeat" size={18} />
                        <Text style={styles.badgeCount}>19</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.footerIcons}>
                    <TouchableHighlight onPress={handlePress}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Icon name="ios-heart-empty" size={18} />
                        <Text style={styles.badgeCount}>27</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
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
    flex: 0.175,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  secondaryContainer: {
    flex: 0.825,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 5,
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
    flex: 1,
  },
  tweetText: {
    marginTop: 1,
    fontSize: 17,
    color: '#555',
  },
  tweetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 0,
    flex: 1,
    marginTop: 15,
    paddingBottom: 5,
  },
  footerIcons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 0.25,
  },
  badgeCount: {
    fontSize: 14,
    paddingLeft: 7,
  },
});
