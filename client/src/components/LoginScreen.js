import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { loginUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class LoginScreen extends React.Component {
  state = {
    username: "",
    password: "",
    errors: {}
  };

  // Event Handlers
  handleChangeText = (type, value) => this.setState({ [type]: value });
  handleRegisterPress = () => this.props.navigation.navigate("Register");
  handleLoginPress = pressEvent => {
    const returningUser = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(returningUser);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.navigation.navigate("Test");
    }
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.navigation.navigate("Test");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Enter your username AND password:</Text>
        <TextInput
          placeholder="username"
          onChangeText={value => this.handleChangeText("username", value)}
          returnKeyType="next"
          autoCorrect={false}
          onSubmitEditing={() => this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          onChangeText={value => this.handleChangeText("password", value)}
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
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
