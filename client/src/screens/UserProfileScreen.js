import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Post from '../components/Post';

export default function UserProfileScreen(props) {
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
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
      renderItem={({ item }) => <Post navigation={props.navigation} />}
      // keyExtractor={item => item._id}
      ItemSeparatorComponent={renderSeparator}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EC8EEC',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    width: '100%',
  },
});
