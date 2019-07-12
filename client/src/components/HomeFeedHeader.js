import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Modal,
  TextInput,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';

const { width } = Dimensions.get('window');

export default function HomeFeedHeader(props) {
  const { user } = props;
  // Intial State
  const [profilePhoto] = useState(user.photoURL);
  const [modalOpen, setModalOpen] = useState(false);
  const [tweet, setTweet] = useState(null);
  const [username] = useState(user.displayName);
  // Firebase Reference
  const dataRef = firebase.database().ref('posts/');
  // Event Handlers
  const openPostModal = () => {
    setModalOpen(true);
  };

  const writeUserData = () => {
    dataRef
      .push({
        text: tweet,
        username: username,
        userPhoto: profilePhoto,
        likes: 0,
        comments: 0,
        retweets: 0,
        usersLiked: {},
      })
      .then(data => {
        console.log('data ', data);
        setModalOpen(false);
      })
      .catch(error => {
        console.log('error ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size={55}
        source={{
          uri: profilePhoto,
        }}
        containerStyle={{
          position: 'absolute',
          left: 0,
          marginTop: 10,
          marginLeft: 10,
          marginBottom: 10,
        }}
      />
      <TouchableOpacity style={styles.openModal} onPress={openPostModal}>
        <Text style={styles.buttonText}>What's going on?</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
        }}
      >
        <View style={styles.outerModalContainer}>
          <View style={styles.topContainer}>
            <Icon
              name="md-close"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 20,
              }}
              onPress={() => setModalOpen(false)}
              color="orangered"
              size={32}
            />
            <TouchableOpacity style={styles.postButton} onPress={writeUserData}>
              <Text style={styles.postText}>Post</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomContainer}>
            <Avatar rounded size={60} source={{ uri: profilePhoto }} />
            <TextInput
              placeholder="What's the latest in bhangra?"
              onChangeText={input => setTweet(input)}
              style={styles.textInput}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingLeft: 10,
  },
  outerModalContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  topContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    paddingTop: 15,
  },
  bottomContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 9,
    paddingLeft: 10,
    paddingTop: 5,
  },
  postButton: {
    height: 32,
    width: width * 0.22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'orangered',
    position: 'absolute',
    right: 0,
    marginRight: 25,
    marginTop: 15,
  },
  postText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 20,
    width: width * 0.8,
    paddingBottom: '-1%',
    marginLeft: 10,
    marginTop: 8,
  },
  openModal: {
    height: 45,
    width: width * 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 15,
    borderColor: '#808B96',
    borderWidth: 1,
    marginLeft: 65,
    paddingLeft: 20,
  },
  buttonText: {
    color: '#808B96',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
});
