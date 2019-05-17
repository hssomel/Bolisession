import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SearchScreen extends React.Component {
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
        <Text style={styles.text}>WELCOME TO THE SEARCH SCREEN</Text>
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
