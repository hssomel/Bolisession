import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { API_ENDPOINT } from "./env"; // import from env.js
// import { API_ENDPOINT } from "react-native-dotenv"; // import from .env
import { Provider, connect } from "react-redux";
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import axios from "axios"; // Test the backend in ComponentDidMount()

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  state = {
    msg: ""
  };

  // componentDidMount() {
  //   axios.get("http://192.168.42.121:8080/test").then(res => {
  //     const msg = res.data.msg;
  //     this.setState({ msg });
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>4 5 6 7!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>
          Testing URL: {API_ENDPOINT}/test:
        </Text>
        <Text style={styles.instructions}>Localhost API Response:</Text>
        <Text style={styles.instructions}>{this.state.msg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
