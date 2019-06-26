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
    props.navigation.navigate('test');
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
              <TouchableHighlight underlayColor="white" activeOpacity={0.75}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Avatar
                    source={{
                      uri: 'http://www.gravatar.com/avatar/?d=identicon',
                    }}
                    rounded
                    size={50}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Text
                      style={{
                        paddingLeft: 15,
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                    >
                      username1
                    </Text>

                    <Text
                      style={{
                        paddingLeft: 15,
                        color: '#aaa',
                        fontSize: 16,
                      }}
                    >
                      @username1
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              <Text style={styles.tweetText}>
                this is the body of the tweet we are going to make this tweet
                long to see how much it can hold
              </Text>
              <View style={styles.tweetFooter}>
                <View style={styles.footerIcons}>
                  <TouchableHighlight>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Icon name="ios-chatboxes" size={18} />
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
                  <TouchableHighlight>
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
          )}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  tweet: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    flexDirection: 'column',
  },
  tweetText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  },
  tweetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 0,
    flex: 1,
    // backgroundColor: 'yellow',
  },
  footerIcons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    flex: 0.25,
  },
  badgeCount: {
    fontSize: 14,
    paddingLeft: 7,
  },
});
