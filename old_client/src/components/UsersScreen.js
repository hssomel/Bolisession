import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UsersScreen extends React.Component {
  constructor() {
    super();
    this.testChat = this.testChat.bind(this);
  }

  testChat() {
    this.props.navigation.navigate("Login");
  }

  render() {
    const { users } = this.props.auth;
    return (
      <FlatList
        style={styles.listcontainer}
        data={users}
        renderItem={({ item }) => <Text>{`${item.username}`}</Text>}
        keyExtractor={item => item._id}
      />
    );
  }
}

UsersScreen.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UsersScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "steelblue",
    height: "100%",
    width: "100%"
  },
  listContainer: {
    width: "100%"
  },
  userContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  name: {
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20
  },
  buttonContainer: {
    borderRadius: 50,
    backgroundColor: "#fff",
    paddingVertical: 15,
    width: "75%"
  },
  buttonText: {
    color: "steelblue",
    textAlign: "center"
  }
});
