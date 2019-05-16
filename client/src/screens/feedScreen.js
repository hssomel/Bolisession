import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { signOutUser } from '../actions/authActionDispatchers';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import firebase from 'react-native-firebase';

class feedScreen extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('feedScreen loaded');
  }

  signOut = () => {
    firebase.auth().signOut();
    // this.props.signOutUser();
    this.props.navigation.navigate('phone');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome!</Text>
        <Text style={styles.text}>This will be your future feed!</Text>
        <Button title="Sign Out" color="red" onPress={this.signOut} />
      </View>
    );
  }
}

// feedScreen.propTypes = {
//   auth: PropTypes.object.isRequired,
//   signOutUser: PropTypes.func.isRequired,
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

// export default connect(
//   mapStateToProps,
//   { signOutUser },
// )(feedScreen);

export default feedScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'chartreuse',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
