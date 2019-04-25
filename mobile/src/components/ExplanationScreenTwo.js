import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ExplanationScreenTwo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Explanation Screen Two</Text>
      </View>
    );
  }
}

export default ExplanationScreenTwo;

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
