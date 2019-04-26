import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class OpeningScreen extends React.Component {
  // Event Handlers
  handleSignUpPress = () => this.props.navigation.navigate('Register');
  handleLoginPress = () => this.props.navigation.navigate('Login');

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/bhangra.png')}
          style={styles.image}
        />
        <Text style={styles.text}>Connect with the</Text>
        <Text style={styles.text}>Bhangra Community</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.handleSignUpPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.handleLoginPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text1}>BhangraSocial</Text>
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
    justifyContent: 'center',
    alignItems: 'space-evenly',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  buttonContainer: {
    flex: 1,
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    textAlign: 'left',
  },
  text1: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: 'black',
    textAlign: 'left',
    marginLeft: 13,
    position: 'absolute',
    bottom: 0,
    marginBottom: '5%',
  },
  image: {
    height: '7.5%',
    width: '7.5%',
    position: 'absolute',
    top: 0,
    marginTop: '5%',
    // alignItems: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#ff001D',
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
