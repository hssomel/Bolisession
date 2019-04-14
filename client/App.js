import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
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

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;

// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <AppContainer />
//       </Provider>
//     );
//   }
// }
