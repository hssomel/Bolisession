import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingIndicator = props => {
  return (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color="orangered" />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  indicator: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
