import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import YouTube from 'react-native-youtube';
import { Button } from 'react-native-elements';
import GradientButton from '../components/GradientButton';
import { uploadProfileVid } from '../actions/userProfileActions';
import YouTubeModal from '../components/YouTubeModal';

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

  const closeModal = () => {
    setModalOpen(false);
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
          <View style={styles.container3}>
            <Text style={{ fontSize: 32, marginBottom: 15 }}>
              UPLOAD A PROFILE VIDEO!
            </Text>
            <Text style={{ fontSize: 18 }}>
              LINK TO A YOUTUBE VIDEO OF YOUR PERFORMANCE! THEN SELECT A START
              TIME FOR THE VIDEO THAT SHOWS YOUR BEST 15 SECONDS
            </Text>
          </View>
        )}
        {allowYoutube && (
          <View style={styles.container4}>
            <Text style={{ fontSize: 32, marginBottom: 5, color: '#424949' }}>
              Preview Video
            </Text>
            <YouTube
              ref={component => {
                _youTubeRef = component;
                setYoutubeRef(component);
              }}
              apiKey="AIzaSyBe-XcmmWplQm2rIwqa17Cy27_bA6Z0Zvw"
              videoId={finalURL}
              play={true}
              fullscreen={false}
              controls={1}
              style={{ height: '75%', width: '100%' }}
              onError={e => console.log(e.error)}
              onReady={onVideoLoad}
            />
          </View>
        )}
      </View>
      <View style={styles.container2}>
        {startTime && finalURL && (
          <Button
            onPress={() => uploadVideo()}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            title="CONFIRM PROFILE VIDEO"
            titleStyle={styles.text2}
          />
        )}
        <GradientButton
          onPress={() => setModalOpen(true)}
          title="UPLOAD YOUTUBE LINK"
        />
      </View>
      <YouTubeModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        handlePress={handlePress}
        setYoutubeURL={setYoutubeURL}
        setStartTime={setStartTime}
      />
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
    flex: 1,
  },
  container2: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  container3: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
  },
  container4: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginTop: '8%',
  },
  buttonContainer: {
    marginBottom: '5%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  buttonStyle: {
    height: 50,
    width: '85%',
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'orangered',
  },
  text2: {
    color: 'orangered',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
  },
});
