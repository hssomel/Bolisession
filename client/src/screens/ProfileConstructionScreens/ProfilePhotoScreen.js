import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import GradientButton from '../../components/GradientButton';
import { uploadImageToFirebaseStorage } from '../../actions/profileConstructionActions';

export default function ProfilePhotoScreen(props) {
  // Initial State
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [allowContinue, setAllowContinue] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useState(props.navigation.getParam('user', null));
  const [dataKey] = useState(props.navigation.getParam('dataKey', null));
  const pickerProps = {
    width: 300,
    height: 300,
    cropping: true,
    cropperCircleOverlay: true,
  };

  const handlePhotoUpload = value => {
    const picker = value
      ? ImagePicker.openPicker(pickerProps)
      : ImagePicker.openCamera(pickerProps);

    picker.then(image => {
      setProfilePhoto(image);
      setModalVisible(false);
      setIsLoading(true);
      uploadImageToFirebaseStorage(image, user, dataKey)
        .then(() => {
          setIsLoading(false);
          setAllowContinue(true);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  const handlePress = () => {
    props.navigation.navigate('AccountType', {
      user,
    });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        {!profilePhoto ? (
          <Avatar
            rounded
            size={150}
            icon={{ name: 'ios-camera', type: 'ionicon' }}
            activeOpacity={0.7}
          />
        ) : (
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
      <GradientButton onPress={openModal} title="UPLOAD PROFILE PHOTO" />
      {isLoading && <ActivityIndicator size="large" color="orangered" />}
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
        <View style={styles.viewModal}>
          <GradientButton
            onPress={() => handlePhotoUpload(false)}
            title="USE CAMERA TO TAKE SELFIE"
          />
          <Text style={styles.text2}>OR</Text>
          <Button
            onPress={() => handlePhotoUpload(true)}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            title="UPLOAD FROM GALLERY"
            titleStyle={{ color: 'orangered', fontSize: 18 }}
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
    marginBottom: '10%',
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    color: 'orangered',
    marginTop: 20,
  },
  text3: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    color: 'orangered',
    marginTop: 25,
  },
  buttonContainer: {
    marginTop: '10%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 50,
    width: '85%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'orangered',
    backgroundColor: 'transparent',
  },
  viewModal: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
