import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';

export default function ProfilePhotoScreen(props) {
  // Initial State
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [allowContinue, setAllowContinue] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(props.navigation.getParam('user', null));
  const [dataKey, setDataKey] = useState(
    props.navigation.getParam('dataKey', null),
  );

  // Firebase References
  const storeImageRef = firebase.storage().ref(`images/${user.uid}`);
  const verifyRef = firebase
    .database()
    .ref('people/')
    .child('users/' + dataKey);

  // Event Handlers
  const updateUser = url => {
    user
      .updateProfile({
        photoURL: url,
      })
      .then(() => {
        verifyRef
          .update({
            profilePhoto: url,
          })
          .then(data => {
            console.log('data ', data);
            setAllowContinue(true);
          })
          .catch(error => {
            console.log('error ', error);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadToFirebase = image => {
    storeImageRef
      .put(image.path, { contentType: 'image/jpeg' })
      .then(snapshot => {
        console.log(JSON.stringify(snapshot.metadata));
        storeImageRef
          .getDownloadURL()
          .then(url => {
            updateUser(url);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlePhotoUpload1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      setProfilePhoto(image);
      setModalVisible(false);
      uploadToFirebase(image);
    });
  };

  const handlePhotoUpload2 = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      setProfilePhoto(image);
      setModalVisible(false);
      uploadToFirebase(image);
    });
  };

  const handlePress = () => {
    props.navigation.navigate('AccountType', {
      user: user,
    });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        {!profilePhoto && (
          <Avatar
            rounded
            size={150}
            icon={{ name: 'ios-camera', type: 'ionicon' }}
            activeOpacity={0.7}
          />
        )}
        {profilePhoto && (
          <Avatar
            rounded
            size={150}
            source={{
              uri: profilePhoto.path,
            }}
          />
        )}
      </View>
      <Text style={styles.text}>Add Profile Picture</Text>
      <Text style={styles.text1}>
        Upload a selfie so your friends know it's you.
      </Text>
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
        title="UPLOAD PROFILE PHOTO"
      />
      {allowContinue && (
        <Text style={styles.text3} onPress={handlePress}>
          CONTINUE
        </Text>
      )}
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
            onPress={handlePhotoUpload2}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#f12711', '#f5af19'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            title="USE CAMERA TO TAKE SELFIE"
          />
          <Text style={styles.text2}>OR</Text>
          <Button
            onPress={handlePhotoUpload1}
            containerStyle={styles.buttonContainer1}
            buttonStyle={styles.buttonStyle1}
            title="UPLOAD FROM GALLERY"
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
  container1: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 150,
    width: '100%',
    marginTop: '4%',
  },
  text: {
    fontSize: 34,
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
  buttonContainer: {
    marginTop: '15%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonContainer1: {
    marginTop: '10%',
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
