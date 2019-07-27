import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import YouTube from 'react-native-youtube';
import firebase from 'react-native-firebase';
import { Avatar } from 'react-native-elements';

export default function YouTubeVideo(props) {
  const {
    style,
    currentUserKey,
    postUserParentKey,
    newURL,
    newStartTime,
    navigateToVideo,
    fromSettings,
  } = props;
  // Initial State
  const [youtubeRef, setYoutubeRef] = useState(null);
  const [finalURL, setFinalURL] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [ready, setReady] = useState(false);
  const [videoExists, setVideoExists] = useState(null);

  // Firebase References
  const userRef = firebase
    .database()
    .ref('people')
    .child('users');

  const onVideoLoaded = () => {
    youtubeRef.seekTo(newStartTime || startTime);
    setReady(true);
  };

  useEffect(() => {
    if (postUserParentKey) {
      const ref = userRef.child(postUserParentKey);
      ref.child('youtubeURL').once('value', snapshot => {
        if (!snapshot.val()) {
          setVideoExists(false);
          setIsLoaded(true);
        } else {
          setFinalURL(snapshot.val());
          setVideoExists(true);
        }
      });

      ref.child('startTime').once('value', snapshot => {
        setStartTime(snapshot.val());
        setIsLoaded(true);
      });
    } else {
      const ref = userRef.child(currentUserKey);
      ref.child('youtubeURL').once('value', snapshot => {
        if (!snapshot.val()) {
          setVideoExists(false);
          setIsLoaded(true);
        } else {
          setFinalURL(snapshot.val());
          setVideoExists(true);
        }
      });
      ref.child('startTime').once('value', snapshot => {
        setStartTime(snapshot.val());
        setIsLoaded(true);
      });
    }

    return () => {
      setIsLoaded(false);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (youtubeRef) {
        youtubeRef.seekTo(newStartTime || startTime);
      }
    }, 17000);

    return () => {
      clearInterval(interval);
    };
  }, [ready]);

  return (
    <View style={{ height: '100%', width: '100%' }}>
      {isLoaded && videoExists && (
        <YouTube
          ref={component => {
            _youTubeRef = component;
            setYoutubeRef(component);
          }}
          apiKey=""
          videoId={newURL || finalURL}
          play={true}
          fullscreen={false}
          controls={1}
          style={style}
          onError={e => console.log(e.error)}
          onReady={onVideoLoaded}
        />
      )}
      {isLoaded && fromSettings && (
        <YouTube
          ref={component => {
            _youTubeRef = component;
            setYoutubeRef(component);
          }}
          apiKey=""
          videoId={newURL || finalURL}
          play={true}
          fullscreen={false}
          controls={1}
          style={style}
          onError={e => console.log(e.error)}
          onReady={onVideoLoaded}
        />
      )}
      {isLoaded && !videoExists && !fromSettings && (
        <Avatar
          size="large"
          icon={{ name: 'md-add-circle', type: 'ionicon', size: 72 }}
          containerStyle={{
            height: '100%',
            width: '100%',
          }}
          onPress={navigateToVideo}
        />
      )}
    </View>
  );
}
