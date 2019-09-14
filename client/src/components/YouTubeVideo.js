import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import YouTube from 'react-native-youtube';

// This component used in screen: SetUpProfileVideo.js
// And component used in components: UserProfileFeedHeader.js & OtherUserProfileHeader.js
const YouTubeVideo = props => {
  const { style, url, startTime } = props;
  // Initial State
  const [youtubeRef, setYoutubeRef] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [ready, setReady] = useState(false);

  const onVideoLoaded = () => {
    youtubeRef.seekTo(startTime || 1);
    setReady(true);
  };

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (youtubeRef) {
        youtubeRef.seekTo(startTime);
      }
    }, 17000);
    return () => {
      clearInterval(interval);
    };
  }, [ready]);

  return (
    <View style={{ height: '100%', width: '100%' }}>
      {isLoaded && url && (
        <YouTube
          ref={component => {
            _youTubeRef = component;
            setYoutubeRef(component);
          }}
          apiKey="AIzaSyBe-XcmmWplQm2rIwqa17Cy27_bA6Z0Zvw"
          videoId={url}
          play={true}
          fullscreen={false}
          controls={1}
          style={style}
          onError={e => console.log(e.error)}
          onReady={onVideoLoaded}
        />
      )}
    </View>
  );
};

export default YouTubeVideo;
