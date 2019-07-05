import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class MessagingListScreen extends React.Component {
  constructor() {
    super();

    this.handleTestPress = this.handleTestPress.bind(this);
  }

  handleTestPress() {
    this.props.testPress(this.props.navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Future DM Screen which will show all users who messaged you
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'salmon',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
