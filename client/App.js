import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { API_ENDPOINT } from "./env"; // import from env.js
import { Provider, connect } from "react-redux";
import store from "./src/store/store";
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import LoginScreen from "./src/components/LoginScreen";
import UsersScreen from "./src/components/UsersScreen";
import RegisterScreen from "./src/components/RegisterScreen";
import TestScreen from "./src/components/TestScreen";

import axios from "axios"; // Test the backend in ComponentDidMount()

const RootStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
    },
    Users: {
      screen: UsersScreen
    },
    Test: {
      screen: TestScreen
    }
  },
  {
    initialRouteName: "Login",
    navigationOptions: {
      headerTitle: "Chat!"
    }
  }
);

const AppContainer = createAppContainer(RootStack);
export default class App extends Component {
  // state = {
  //   msg: ""
  // };

  // componentDidMount() {
  //   axios.get({ API_ENDPOINT } + "/test").then(res => {
  //     const msg = res.data.msg;
  //     this.setState({ msg });
  //   });
  // }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>5 6 7 8 9!</Text>
      //   <Text style={styles.instructions}>To get started, edit App.js</Text>
      //   <Text style={styles.instructions}>
      //     Testing URL: {API_ENDPOINT}/test:
      //   </Text>
      //   <Text style={styles.instructions}>Localhost API Response:</Text>
      //   <Text style={styles.instructions}>{this.state.msg}</Text>
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10
//   },
//   instructions: {
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5
//   }
// });
