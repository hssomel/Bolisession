import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
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
import SettingsScreen from "./src/components/SettingsScreen";

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
    screen: TestScreen //aka the future FeedScreen
  },
  Users: {
    screen: UsersScreen
  },
  Messages: {
    screen: MessagesScreen
  }
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: AppStack,
    Settings: SettingsScreen
  },
  {
    navigationOptions: ({ navigation }) => {
      // const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: <Text style={styles.buttonText}>Bhangra App</Text>
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Drawer</Text>
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity
            onPress={() => navigation.navigate("Users")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>DM's</Text>
          </TouchableOpacity>
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator(
  {
    Login: AuthStack,
    Dashboard: { screen: AppDrawerNavigator }
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);

export default (App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: "75%",
    backgroundColor: "indianred",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 10
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 12
  },
  buttonText2: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    alignItems: "center",
    fontWeight: "bold"
  }
});
