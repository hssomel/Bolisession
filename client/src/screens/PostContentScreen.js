import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Modal } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';

export default function PostContentScreen(props) {
  // Initial State
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setModalVisible(true);
    console.log('mounted to post content screen');
    return () => {
      setModalVisible(false);
      console.log('unmounted from post content screen');
    };
  }, []);

  useEffect(() => {
    const verifyRef = firebase
      .database()
      .ref('people/')
      .child('users');

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      verifyRef
        .orderByChild('userID')
        .equalTo(user.uid)
        .once('value', snapshot => {
          setUser(user);
        });
      setProfilePhoto(user.photoURL);
    });

    return () => {
      if (unsubscribe) unsubscribe();
      console.log('listener unmounted from PostContentScreen');
    };
  });

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            rounded
            size={150}
            source={{ uri: profilePhoto }}
            // icon={{ name: 'ios-camera', type: 'ionicon' }}
          />
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#f12711', '#f5af19'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            title="CREATE TEAM ACCOUNT"
            onPress={() => props.navigation.goBack()}
          />
          <Button
            containerStyle={styles.buttonContainer1}
            buttonStyle={styles.buttonStyle1}
            title="CREATE COMPETITION ACCOUNT"
            titleStyle={{ color: 'orangered' }}
          />
        </View>
      </Modal>
    </SafeAreaView>
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
  buttonContainer: {
    marginTop: '8%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonContainer1: {
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
  buttonStyle1: {
    height: 50,
    width: '85%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'orangered',
    backgroundColor: 'transparent',
  },
});
