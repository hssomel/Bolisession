import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ExplanationScreenOne extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Explanation Screen One</Text>
      </View>
    );
  }
}

export default ExplanationScreenOne;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    textAlign: 'left',
    marginLeft: 13,
  },
});
