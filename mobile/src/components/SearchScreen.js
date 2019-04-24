import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { testPress } from "../actions/authActionDispatchers";
import { connect } from "react-redux";

class SearchScreen extends React.Component {
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
        <Text style={styles.text}>WELCOME TO THE SEARCH SCREEN</Text>
      </View>
    );
  }
}

SearchScreen.propTypes = {
  testPress: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { testPress }
)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "salmon",
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
