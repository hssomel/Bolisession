import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import GradientButton from '../../components/GradientButton';
import {
  getClientUserKey,
  getProfileData,
} from '../../actions/Authentication/authActions';

const { height, width } = Dimensions.get('window');

const AccountTypeScreen = ({ navigation }) => {
  const user = navigation.getParam('user', null);
  // Initial State
  const [modalVisible, setModalVisible] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  // Event Handlers
  const setFields = async user => {
    const key = await getClientUserKey(user);
    const data = await getProfileData(key);
    setProfileData(data);
    setIsLoaded(true);
  };

  useEffect(() => {
    setFields(user);
  }, []);

  const handlePress = () => {
    navigation.navigate('Home', {
      user,
    });
  };

  const handleModalButton = () => {
    Alert.alert(
      'Team & Competition account types feature will be available next update!',
    );
    navigation.navigate('Home', {
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
          <Text style={styles.text}>Welcome, {profileData.username}</Text>
          <Avatar
            rounded
            size={150}
            source={{ uri: profileData.profilePhoto }}
          />
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
};

export default AccountTypeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height,
    // width: '100%',
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
    // backgroundColor: 'transparent',
  },
  modalView: {
    height,
    width,
    alignItems: 'center',
  },
});
