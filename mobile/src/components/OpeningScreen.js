import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Video from 'react-native-video';

class OpeningScreen extends React.Component {
  // Event Handlers
  handleSignUpPress = () => this.props.navigation.navigate('Register');
  handleLoginPress = () => this.props.navigation.navigate('Login');

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewOne}>
          {/* <Image
            source={require('../assets/images/bhangra.png')}
            style={styles.image}
          /> */}
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
          />
          <Text style={styles.text}>Connect with the</Text>
          <Text style={styles.text1}>Bhangra Community</Text>
          <TouchableOpacity
            onPress={this.handleSignUpPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleLoginPress}
            style={styles.button1}
            outline={true}
          >
            <Text style={styles.buttonText1}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

OpeningScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(OpeningScreen);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
    alignContent: 'center',
  },
  viewOne: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1.25,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'pink',
    marginTop: '8%',
  },
  text1: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'pink',
    marginBottom: '25%',
  },
  image: {
    height: '12.5%',
    width: '12.5%',
    position: 'absolute',
    top: 0,
    marginTop: '1%',
  },
  button: {
    width: '80%',
    backgroundColor: 'transparent',
    borderRadius: 32,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: '90%',
    paddingVertical: 11,
    borderColor: 'white',
    borderWidth: 2,
  },
  button1: {
    width: '80%',
    backgroundColor: 'coral',
    borderRadius: 32,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: '4%',
    paddingVertical: 11,
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
