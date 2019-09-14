import React from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function YouTubeModal(props) {
  const {
    modalOpen,
    closeModal,
    handleURLinsert,
    setStartTime,
    setYoutubeURL,
  } = props;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalOpen}
      onRequestClose={() => closeModal()}
    >
      <View style={styles.outerModalContainer}>
        <View style={styles.topContainer}>
          <Icon
            name="md-close"
            style={styles.iconStyle}
            onPress={() => closeModal()}
            color="orangered"
            size={32}
          />
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => handleURLinsert()}
          >
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            placeholder="Please format url 'youtube.com/url'"
            onChangeText={input => setYoutubeURL(input)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Start time in seconds (s)"
            onChangeText={input => setStartTime(input)}
            style={styles.textInput}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 10,
    paddingLeft: 10,
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
    marginTop: 15,
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
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
});
