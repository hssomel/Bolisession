import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientButton(props) {
  const { title, onPress } = props;
  return (
    <Button
      containerStyle={styles.buttonContainer}
      buttonStyle={styles.buttonStyle}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ['#f12711', '#f5af19'],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      title={title}
      titleStyle={styles.text}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 50,
    width: '85%',
    borderRadius: 25,
    elevation: 3,
  },
  text: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
  },
});
