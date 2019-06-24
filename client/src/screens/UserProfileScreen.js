import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Post from '../components/Post';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer1}>
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['red', 'orange'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          title="Sign in with phone number"
          titleStyle={styles.text2}
          onPress={handlePress}
        />
      </View>
      <View style={styles.viewContainer2}>
        <FlatList
          style={styles.listcontainer}
          data={feedData}
          renderItem={({ item }) => <Post navigation={props.navigation} />}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EC8EEC',
    height: '100%',
    width: '100%',
    flex: 10,
  },
  viewContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EC8EEC',
    height: '100%',
    width: '100%',
    flex: 2,
  },
  viewContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EC8EEC',
    height: '100%',
    width: '100%',
    flex: 8,
  },
  listContainer: {
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '20%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 55,
    width: '85%',
    borderRadius: 10,
  },
});
