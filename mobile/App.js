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
import ProfileScreen from "./src/components/ProfileScreen";
import SearchScreen from "./src/components/SearchScreen";
import Icon from "react-native-vector-icons/Ionicons";

// -------- STACKS ( NOT TO BE CONFUSED WITH NAVIGATORS!!! ) ------- //
const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  }
});

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

const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen
  }
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen
  }
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen
  }
});

// ----- END OF STACKS ----------//

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: AppStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={24} />
        )
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-search" color={tintColor} size={24} />
        )
      }
    }, // for searching teams/competitions --equivalent to instagram search icon
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="android" color={tintColor} size={24} />
        )
      }
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-settings" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: "red",
      inactiveTintColor: "grey"
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

const AppSwitchNavigator = createSwitchNavigator({
  Login: AuthStack,
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default (App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
));

const styles = StyleSheet.create({
  button: {
    width: "75%",
    backgroundColor: "indianred",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 15
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 10
  },
  buttonText2: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    alignItems: "center",
    fontWeight: "bold"
  }
});
