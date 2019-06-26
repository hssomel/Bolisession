import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function Post(props) {
  const {
    // tweet,
    // name,
    // handle,
    // time,
    // retweeted,
    // liked,
    // picture,
    navigation,
    // thekey,
    // isReply,
  } = props;

  const handleTestPress = () => {
    props.navigation.navigate('Map');
  };

  return (
    <TouchableOpacity style={styles.button}>
      <Text>helloooooooooooooooooo</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: 'blue',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  toContainer1: {
    flex: 1,
    backgroundColor: 'orange',
  },
  button: {
    flex: 100,
    marginLeft: '0%',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});
