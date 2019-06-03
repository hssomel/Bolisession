import React, { useState } from 'react';
// import ImagePicker from 'react-native-image-picker';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

export default function ProfilePhotoScreen(props) {
  // Initial State
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Event Handlers
  const handlePhotoUpload = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            setProfilePhoto(response);
          }
        });
      } else {
        const source = { uri: response.uri };
        setProfilePhoto(source);
      }
    });
  };

  const handlePress = () => {
    props.navigation.navigate('Home');
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
              uri: profilePhoto.uri,
            }}
          />
        )}
      </View>
      <Text style={styles.text}>Add Profile Picture</Text>
      <Text style={styles.text1}>
        Upload a selfie so your friends know it's you.
      </Text>
      <Button
        onPress={handlePhotoUpload}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['red', 'orange'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        title="SET PROFILE PHOTO"
      />
      {profilePhoto && (
        <Text style={styles.text2} onPress={handlePress}>
          CONTINUE
        </Text>
      )}
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
  buttonStyle: {
    height: 50,
    width: '85%',
    borderRadius: 25,
  },
});
