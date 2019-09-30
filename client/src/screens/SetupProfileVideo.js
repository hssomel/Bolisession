import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GradientButton from '../components/GradientButton';
import { uploadProfileVideo } from '../actions/profileActions';
import YouTubeModal from '../components/VideoUploadComponents/YouTubeModal';
import YouTubeVideo from '../components/VideoUploadComponents/YouTubeVideo';

const { width, height } = Dimensions.get('window');

const SetupProfileVideo = ({ navigation, userkey, uploadProfileVideo }) => {
  // This might run an error because we need to do const [key]
  //Initial State
  const [modalOpen, setModalOpen] = useState(false);
  const [youtubeURL, setYoutubeURL] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [slicedURL, setFinalURL] = useState(null);
  const [videoSelected, setVideoSelected] = useState(false);
  // Event Handlers
  const sliceYouTubeURL = () => {
    return new Promise(resolve => {
      const url = youtubeURL.slice(-11);
      setFinalURL(url);
      const time = Number(startTime);
      setStartTime(time);
      resolve(url);
    });
  };

  const handleURLinsert = () => {
    setModalOpen(false);
    sliceYouTubeURL()
      .then(res => {
        if (res) {
          setVideoSelected(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const reUpload = () => {
    setModalOpen(true);
    setVideoSelected(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {videoSelected ? (
          <View style={styles.containerTwo}>
            <Text style={{ fontSize: 32, marginBottom: 5, color: '#424949' }}>
              Preview Video
            </Text>
            <YouTubeVideo
              style={{ height: '75%', width: '100%' }}
              url={slicedURL}
              startTime={startTime}
            />
          </View>
        ) : (
          <View style={styles.containerOne}>
            <View style={{ alignItems: 'flex-start' }}>
              <Icon
                name="ios-arrow-round-back"
                size={36}
                color="orangered"
                onPress={() => navigation.goBack()}
              />
            </View>
            <Text style={styles.titleText}>Upload a profile video</Text>
            <Text style={{ fontSize: 18 }}>
              Link to a youtube video of you performing! Then select a start
              time that showcases your best 15 seconds!
            </Text>
          </View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        {startTime && slicedURL && videoSelected && (
          <Button
            onPress={() => uploadProfileVideo(userkey, slicedURL, startTime)}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            title="Confirm profile video"
            titleStyle={styles.buttonText}
          />
        )}
        {videoSelected ? (
          <GradientButton onPress={reUpload} title="Reupload youtube link" />
        ) : (
          <Avatar
            size="large"
            icon={{
              name: 'md-camera',
              type: 'ionicon',
              size: 72,
              color: 'orangered',
            }}
            containerStyle={{
              height: '50%',
              width: '50%',
            }}
            onPress={() => setModalOpen(true)}
            overlayContainerStyle={styles.cameraIcon}
          />
        )}
      </View>
      <YouTubeModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        handleURLinsert={handleURLinsert}
        setYoutubeURL={setYoutubeURL}
        setStartTime={setStartTime}
      />
    </View>
  );
};

SetupProfileVideo.propTypes = {
  userkey: PropTypes.string.isRequired,
  uploadProfileVideo: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  userkey: state.auth.userkey,
});

export default connect(
  mapStateToProps,
  { uploadProfileVideo },
)(SetupProfileVideo);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height,
  },
  topContainer: {
    alignItems: 'center',
    height: '100%',
    width,
    flex: 1,
    paddingTop: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    height: '100%',
    width,
    flex: 1,
  },
  containerOne: {
    paddingTop: 5,
    alignItems: 'flex-start',
    paddingRight: 15,
    paddingLeft: 15,
  },
  containerTwo: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: '5%',
    marginBottom: '5%',
    alignItems: 'center',
    width: '100%',
  },
  buttonStyle: {
    height: 50,
    width: '85%',
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'orangered',
  },
  buttonText: {
    color: 'orangered',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
  },
  titleText: {
    fontSize: 32,
    marginBottom: 15,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
  },
  cameraIcon: {
    borderColor: 'orangered',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 25,
    backgroundColor: 'transparent',
  },
});
