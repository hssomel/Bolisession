import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      usertype: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(type, value) {
    this.setState({ [type]: value });
  }

  handleRegister() {
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      usertype: this.state.usertype
    };
    // register function in "authActions.js"
    this.props.registerUser(newUser, this.props.navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Enter your username and password:</Text>
        <TextInput
          placeholder="username"
          onChangeText={value => this.handleChange("username", value)}
          returnKeyType="next"
          autoCorrect={false}
          onSubmitEditing={() => this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          onChangeText={value => this.handleChange("password", value)}
          secureTextEntry
          returnKeyType="go"
          autoCapitalize="none"
          style={styles.input}
          ref={input => (this.passwordInput = input)}
        />
        <TextInput
          placeholder="password2"
          onChangeText={value => this.handleChange("password2", value)}
          secureTextEntry
          returnKeyType="go"
          autoCapitalize="none"
          style={styles.input}
          ref={input => (this.passwordInput = input)}
        />
        <TextInput
          placeholder="usertype"
          onChangeText={value => this.handleChange("usertype", value)}
          secureTextEntry
          returnKeyType="go"
          autoCapitalize="none"
          style={styles.input}
          ref={input => (this.passwordInput = input)}
        />

        <TouchableOpacity onPress={this.handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

RegisterScreen.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    height: "100%",
    width: "100%"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    width: "90%",
    borderWidth: 0.5,
    borderColor: "black",
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
    marginTop: 10
  },
  button: {
    width: "75%",
    backgroundColor: "blue",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  }
});
