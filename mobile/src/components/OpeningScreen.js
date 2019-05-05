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
          <Image
            source={require('../assets/images/bhangra.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Connect with the</Text>
          <Text style={styles.text}>Bhangra Community</Text>
        </View>
        <View style={styles.viewTwo}>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1.25,
  },
  viewTwo: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: '5%',
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    // textAlign: 'left',
  },
  image: {
    height: '12.5%',
    width: '12.5%',
    position: 'absolute',
    top: 0,
    marginTop: '1%',
  },
  button: {
    width: '40%',
    backgroundColor: '#ff001D',
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '7%',
    paddingVertical: 12.5,
  },
  button1: {
    width: '40%',
    backgroundColor: 'white',
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '7%',
    paddingVertical: 12.5,
    borderColor: 'black',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: '#ff001D',
    textAlign: 'center',
    fontSize: 24,
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
