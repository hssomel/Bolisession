import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { testPress } from "../actions/authActions";
import { connect } from "react-redux";

class TestScreen extends React.Component {
  constructor() {
    super();

    this.handleTestPress = this.handleTestPress.bind(this);
  }

  handleTestPress() {
    this.props.testPress(this.props.navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.auth.user.username}</Text>
        <TouchableOpacity onPress={this.handleTestPress} style={styles.button}>
          <Text style={styles.buttonText}>Go to Chat</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

TestScreen.propTypes = {
  testPress: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { testPress }
)(TestScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    height: "100%",
    width: "100%"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
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
