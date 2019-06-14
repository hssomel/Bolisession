import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Modal } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';

export default function AccountTypeScreen(props) {
  // Initial State
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setUserName(user.displayName);
        setProfilePhoto(user.photoURL);
      } else {
        // User has been signed out, reset the state
        setUser(null);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
      console.log('unmounted from create account screen');
    };
  });

  const handlePress = () => {
    props.navigation.navigate('Home');
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome, {username}</Text>
      <View style={styles.viewContainer}>
        <Avatar
          rounded
          size={150}
          source={{ uri: profilePhoto }}
          // icon={{ name: 'ios-camera', type: 'ionicon' }}
        />
      </View>
      <Text style={styles.text1}>Manager of a Team or Competition?</Text>
      <Button
        onPress={openModal}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#f12711', '#f5af19'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        title="Create a Special Account"
        titleStyle={{ fontSize: 18 }}
      />
      <View style={styles.viewContainer1}>
        <Text style={styles.bottomText} onPress={handlePress}>
          Skip and continue
        </Text>
      </View>
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
          <Button
            onPress={handlePress}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#f12711', '#f5af19'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            title="CREATE TEAM ACCOUNT"
          />
          <Button
            onPress={handlePress}
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
  viewContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 0.3,
  },
  viewContainer1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
    position: 'absolute',
    bottom: 0,
    marginBottom: '4%',
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '8%',
  },
  text1: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    color: 'black',
    marginTop: '8%',
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    color: 'orangered',
    marginTop: '1%',
  },
  text3: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    color: 'orangered',
    marginTop: '1%',
  },
  bottomText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    color: 'orangered',
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
