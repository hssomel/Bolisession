import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { getUsers } from '../actions/authActionDispatchers';
import { connect } from 'react-redux';

class MessagesScreen extends React.Component {
  constructor() {
    super();

    this.handleTestPress = this.handleTestPress.bind(this);
  }

  handleTestPress() {
    this.props.getUsers(this.props.navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Hey! {this.props.auth.user.username}</Text>
        <Text style={styles.text}>
          This will be the Private Messages Screen
        </Text>
        <Text style={styles.text}>Start a Conversation!</Text>
      </View>
    );
  }
}

MessagesScreen.propTypes = {
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getUsers },
)(MessagesScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orchid',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '75%',
    backgroundColor: 'blue',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
