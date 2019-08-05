import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
} from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import GradientButton from '../components/GradientButton';

export default function AccountTypeScreen(props) {
  // Initial State
  const [modalVisible, setModalVisible] = useState(false);
  const [user] = useState(props.navigation.getParam('user', null));
  const [username, setUsername] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);

  useEffect(() => {
    setUsername(user.displayName);
    setProfilePhoto(user.photoURL);
    setIsLoaded(true);
  }, [profilePhoto]);

  const handlePress = () => {
    props.navigation.navigate('Home', {
      user,
    });
  };

  const handleModalButton = () => {
    Alert.alert(
      'Team & Competition account types feature will be available next update!',
    );
    props.navigation.navigate('Home', {
      user,
    });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView>
      {isLoaded && (
        <View style={styles.container}>
          <Text style={styles.text}>Welcome, {username}</Text>
          <Avatar rounded size={150} source={{ uri: profilePhoto }} />
          <Text style={styles.text1}>Manager of a Team or Competition?</Text>
          <GradientButton
            onPress={openModal}
            title="Create a Special Account"
          />
          <Text style={styles.bottomText} onPress={handlePress}>
            Skip and continue
          </Text>

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalView}>
              <GradientButton
                onPress={handleModalButton}
                title="CREATE TEAM ACCOUNT"
              />
              <Button
                onPress={handleModalButton}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.buttonStyle}
                title="CREATE COMPETITION ACCOUNT"
                titleStyle={{ color: 'orangered' }}
              />
            </View>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '5%',
    marginBottom: '3%',
  },
  text1: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    color: 'black',
    marginTop: '6%',
    marginBottom: '2%',
  },
  bottomText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    color: 'orangered',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 25,
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
    borderWidth: 2,
    borderColor: 'orangered',
    backgroundColor: 'transparent',
  },
  modalView: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
