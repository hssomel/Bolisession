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
import { Button, Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import YouTube from 'react-native-youtube';

const { width } = Dimensions.get('window');

export default function SetupProfileVideo(props) {
  //Initial State
  const [user] = useState(props.navigation.getParam('user', null));
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser] = useState(
    props.navigation.getParam('currentUser', null),
  );
  const [currentUserKey] = useState(
    props.navigation.getParam('currentUserKey', null),
  );
  const [youtubeURL, setYoutubeURL] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [finalURL, setFinalURL] = useState(null);
  const [allowYoutube, setAllowYoutube] = useState(false);
  const [youtubeRef, setYoutubeRef] = useState(null);

  // Event Handlers
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
          console.log('res', res);
          setAllowYoutube(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onYouTubeLoad = () => {
    youtubeRef.seekTo(startTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Avatar
          rounded
          size={150}
          icon={{ name: 'ios-camera', type: 'ionicon' }}
          activeOpacity={0.7}
        />
      </View>

      {/* <Text style={styles.text}>Add a Profile Video!</Text>
      <Text style={styles.text1}>
        Showcase your talent. Link to a Youtube Video of you Performing!
      </Text>
      <Text style={styles.text1}>
        Then enter a start time to showcase your best 15 seconds! The video will
        then loop on your profile!
      </Text> */}
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        ViewComponent={LinearGradient}
        onPress={() => onYouTubeLoad}
        linearGradientProps={{
          colors: ['#f12711', '#f5af19'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        title="RELOAD"
      />
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        ViewComponent={LinearGradient}
        onPress={() => setModalOpen(true)}
        linearGradientProps={{
          colors: ['#f12711', '#f5af19'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        title="UPLOAD YOUTUBE LINK"
      />
      {allowYoutube && (
        <YouTube
          ref={component => {
            _youTubeRef = component;
            setYoutubeRef(component);
          }}
          apiKey=""
          videoId={finalURL}
          play={true}
          // loop={isLoop}
          fullscreen={false}
          controls={1}
          style={{ height: '30%', width: '85%' }}
          onError={e => console.log(e.error)}
          onReady={onYouTubeLoad}
          // onChangeState={e => this.setState({ status: e.state })}
          // onChangeQuality={e => this.setState({ quality: e.quality })}
          // onChangeFullscreen={e => customFunction(e)}
        />
      )}

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
