import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { loginUser } from '../actions/authActionDispatchers';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
    errors: {},
  };

  // Event Handlers
  handleChangeText = (type, value) => this.setState({ [type]: value });
  handleRegisterPress = () => this.props.navigation.navigate('Register');
  handleLoginPress = () => {
    const { username, password } = this.state;
    this.props.loginUser({ username, password });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.navigation.navigate('Dashboard');
    }
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.navigation.navigate('Dashboard');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>BholiSession</Text>
        <TextInput
          placeholder="username"
          onChangeText={value => this.handleChangeText('username', value)}
          returnKeyType="next"
          autoCorrect={false}
          onSubmitEditing={() => this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          onChangeText={value => this.handleChangeText('password', value)}
          secureTextEntry // changes password to ***
          returnKeyType="go"
          autoCapitalize="none"
          style={styles.input}
          value={this.state.password}
          ref={input => (this.passwordInput = input)}
        />
        <TouchableOpacity onPress={this.handleLoginPress} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleRegisterPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { loginUser },
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  input: {
    height: 45,
    width: '87%',
    borderWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: 'whitesmoke',
    color: '#000',
    textAlign: 'left',
    marginTop: 14,
    paddingLeft: '5%',
    borderRadius: 10,
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
