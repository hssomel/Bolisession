import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import YouTube from 'react-native-youtube';
import GradientButton from '../components/GradientButton';
import { uploadProfileVid } from '../actions/userProfileActions';

const { width } = Dimensions.get('window');

export default function SetupProfileVideo(props) {
  //Initial State
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUserKey] = useState(
    props.navigation.getParam('currentUserKey', null),
  );
  const [youtubeURL, setYoutubeURL] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [finalURL, setFinalURL] = useState(null);
  const [allowYoutube, setAllowYoutube] = useState(false);
  const [youtubeRef, setYoutubeRef] = useState(null);

  const sliceString = () => {
    return new Promise((resolve, reject) => {
      const slice = youtubeURL.slice(-11);
      setFinalURL(slice);
      const time = Number(startTime);
      setStartTime(time);
      resolve(slice);
    });
  };

  const handlePress = () => {
    setModalOpen(false);
    sliceString()
      .then(res => {
        if (res) {
          setAllowYoutube(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onVideoLoad = () => {
    youtubeRef.seekTo(startTime);
    setInterval(() => {
      youtubeRef.seekTo(startTime);
    }, 16000);
  };

  const uploadVideo = () => {
    uploadProfileVid(currentUserKey, finalURL, startTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        {!allowYoutube && (
          <View>
            <Text>UPLOAD A PROFILE VIDEO!</Text>
            <Text>LINK TO A YOUTUBE VIDEO OF YOUR PERFORMANCE!</Text>
            <Text>THEN SELECT A START TIME FOR THE VIDEO</Text>
            <Text>THAT SHOWS YOUR BEST 15 SECONDS</Text>
          </View>
        )}
        {allowYoutube && (
          <YouTube
            ref={component => {
              _youTubeRef = component;
              setYoutubeRef(component);
            }}
            apiKey=""
            videoId={finalURL}
            play={true}
            fullscreen={false}
            controls={1}
            style={{ height: '60%', width: '85%' }}
            onError={e => console.log(e.error)}
            onReady={onVideoLoad}
          />
        )}
      </View>
      <View style={styles.container2}>
        {startTime && finalURL && (
          <GradientButton
            onPress={() => uploadVideo()}
            title="SET AS PROFILE VIDEO"
          />
        )}
        <GradientButton
          onPress={() => setModalOpen(true)}
          title="UPLOAD YOUTUBE LINK"
        />
      </View>
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
            <TouchableOpacity
              style={styles.postButton}
              onPress={() => handlePress()}
            >
              <Text style={styles.postText}>Post</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomContainer}>
            <TextInput
              placeholder="Please enter youtube url?"
              onChangeText={input => setYoutubeURL(input)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Please enter a start time in seconds"
              onChangeText={input => setStartTime(input)}
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  container1: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop: '4%',
    flex: 1.5,
  },
  container2: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop: '4%',
    flex: 1,
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
