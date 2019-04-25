import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class OpeningScreen extends React.Component {
  // Event Handlers
  handlePress = () => this.props.navigation.navigate('Login');

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/bhangra.png')}
          style={styles.input}
        />
        <Text style={styles.text}>Connect with the</Text>
        <Text style={styles.text}>Bhangra Community</Text>
        <TouchableOpacity onPress={this.handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    textAlign: 'left',
    marginLeft: 13,
  },
  input: {
    height: '7.5%',
    width: '7.5%',
    position: 'absolute',
    top: 0,
    marginTop: 10,
  },
  button: {
    width: '75%',
    backgroundColor: 'skyblue',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
