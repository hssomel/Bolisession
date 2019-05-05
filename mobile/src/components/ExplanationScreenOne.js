import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

class ExplanationScreenOne extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Video
          source={require('../assets/videos/sample1.mp4')}
          ref={ref => {
            this.player = ref;
          }}
          repeat={true}
          onBuffer={this.onBuffer}
          onError={this.videoError}
          style={styles.backgroundVideo}
          resizeMode={'cover'}
          // fullscreen={true}
        />
      </View>
    );
  }
}

export default ExplanationScreenOne;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'red',
    height: '100%',
    // width: '100%',
    // flex: 1,
    // alignContent: 'center',
  },
});
