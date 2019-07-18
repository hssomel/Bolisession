import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default function SetupProfileVideo(props) {
  //Initial State
  const [user] = useState(props.navigation.getParam('user', null));
  const [currentUser] = useState(
    props.navigation.getParam('currentUser', null),
  );
  const [currentUserKey] = useState(
    props.navigation.getParam('currentUserKey', null),
  );

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Avatar
          rounded
          size={150}
          icon={{ name: 'ios-camera', type: 'ionicon' }}
          activeOpacity={0.7}
        />
      </View>
      <Text style={styles.text}>Add a Profile Video</Text>
      <Text style={styles.text1}>Enter a YouTube URL of you performing!</Text>
      <Text style={styles.text1}>
        Then enter a start time to show a 15 second clip!
      </Text>
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#f12711', '#f5af19'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        title="UPLOAD YOUTUBE LINK"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  container1: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 150,
    width: '100%',
    marginTop: '4%',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '8%',
  },
  text1: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    color: 'black',
    marginTop: '4%',
  },
  buttonContainer: {
    marginTop: '15%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 50,
    width: '85%',
    borderRadius: 25,
  },
});
