import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import store from './src/store/store';
import LoginScreen from './src/components/LoginScreen';
import UsersScreen from './src/components/UsersScreen';
import RegisterScreen from './src/components/RegisterScreen';
import TestScreen from './src/components/TestScreen';
import MessagesScreen from './src/components/MessagesScreen';
import SettingsScreen from './src/components/SettingsScreen';
import ProfileScreen from './src/components/ProfileScreen';
import SearchScreen from './src/components/SearchScreen';
import OpeningScreen from './src/components/OpeningScreen';
import ExplanationScreenOne from './src/components/ExplanationScreenOne';
import ExplanationScreenTwo from './src/components/ExplanationScreenTwo';

// -------- STACKS ( NOT TO BE CONFUSED WITH NAVIGATORS!!! ) ------- //
const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const IntroStack = createMaterialTopTabNavigator(
  {
    Ex_1: {
      screen: ExplanationScreenOne,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Ex_2: {
      screen: ExplanationScreenTwo,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Ex_3: {
      screen: OpeningScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    navigationOptions: {
      tabBarVisible: false,
      tabBarIcon: {
        tintColor: 'red',
      },
    },
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
        width: 0,
      },
      showLabel: false,
    },
  },
);

const AppStack = createStackNavigator({
  Test: {
    screen: TestScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Users: {
    screen: UsersScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Messages: {
    screen: MessagesScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

// ----- END OF STACKS ----------//

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: AppStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={30} />
        ),
      },
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-search" color={tintColor} size={30} />
        ),
      },
    }, // for searching teams/competitions --equivalent to instagram search icon
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={30} />
        ),
      },
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        // tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-settings" color={tintColor} size={30} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      tabBarVisible: true,
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      showLabel: false,
    },
  },
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            name="ios-menu"
            style={styles.button1}
            onPress={() => navigation.openDrawer()}
            color="grey"
            size={30}
          />
        ),
        headerRight: (
          <Icon
            name="ios-paper-plane"
            style={styles.button2}
            onPress={() => navigation.navigate('Users')}
            color="grey"
            size={30}
          />
        ),
      };
    },
  },
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: DashboardStackNavigator,
});

const AppSwitchNavigator = createSwitchNavigator({
  Intro: IntroStack,
  Auth: AuthStack,
  Dashboard: { screen: AppDrawerNavigator },
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default (App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
));

const styles = StyleSheet.create({
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 17,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 10,
  },
  buttonText2: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    alignItems: 'center',
    fontWeight: 'bold',
  },
});

// const AuthStack = createStackNavigator({
//   Opening: {
//     screen: OpeningScreen,
//     navigationOptions: () => ({
//       header: null,
//     }),
//   },
//   Login: {
//     screen: LoginScreen,
//     navigationOptions: () => ({
//       header: null,
//     }),
//   },
//   Register: {
//     screen: RegisterScreen,
//     navigationOptions: () => ({
//       header: null,
//     }),
//   },
// });
