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
import MessagesScreen from "./src/components/MessagesScreen";

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
    }
  },
  {
    initialRouteName: "Login",
    navigationOptions: {
      headerTitle: "Chat!"
    }
  }
);

const AppStack = createStackNavigator({
  Test: {
    screen: TestScreen
  },
  Users: {
    screen: UsersScreen
  },
  Messages: {
    screen: MessagesScreen
  }
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);

export default (App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
));
