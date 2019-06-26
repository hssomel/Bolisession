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
      .limitToLast(100);
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

  const handleLikePress = (item, key) => {
    const likeRef = firebase.database().ref('posts/' + key);
    likeRef.child('likes').transaction(current_value => {
      return (current_value || 0) + 1;
    });

    const whoLikes = [];
    likeRef
      .child('usersLiked')
      .once('value', snapshot => {
        snapshot.forEach(data => {
          whoLikes.push(data.val());
        });
      })
      .then(() => {
        console.log('whoLikes........', whoLikes);
      });

    console.log('heart icon pressed');
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
                        uri: item._value.userPhoto,
                      }}
                      rounded
                      size={60}
                    />
                  </View>
                </TouchableHighlight>
              </View>

              <View style={styles.secondaryContainer}>
                <View
                  style={{
                    backgroundColor: '#ff7f50', // light orange
                    height: '100%',
                    width: '100%',
                    flex: 1,
                  }}
                >
                  <Text style={styles.usernameText}>
                    {item._value.username}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#00ff00', // lime green
                    height: '100%',
                    width: '100%',
                    flex: 1,
                  }}
                >
                  <Text style={styles.tweetText}>{item._value.text}</Text>
                </View>

                <View
                  style={{
                    backgroundColor: 'red',
                    height: '100%',
                    width: '100%',
                    flexDirection: 'row',
                    paddingTop: 15,
                    paddingBottom: 5,
                    flex: 1,
                    justifyContent: 'space-evenly',
                  }}
                >
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
                      <Icon
                        name="ios-heart-empty"
                        size={20}
                        onPress={() => handleLikePress(item, item.key)}
                      />
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
    backgroundColor: '#8acafe',
  },
  secondaryContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 5,
    backgroundColor: '#cccccc',
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'purple',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  badgeCount: {
    fontSize: 16,
    paddingLeft: 7,
  },
});
