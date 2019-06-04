import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Screens
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import LandingPageScreen from './src/screens/LandingPageScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import UserBioScreen from './src/screens/UserBioScreen';

import { Provider } from 'react-redux';
import store from './src/store/store';
import PhoneConfirmationScreen from './src/screens/PhoneConfirmationScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import ProfilePhotoScreen from './src/screens/ProfilePhotoScreen';

const CreateAccountStack = createStackNavigator({
  // Create: {
  //   screen: CreateAccountScreen,
  //   navigationOptions: () => ({
  //     header: null,
  //   }),
  // },
  ProfilePhoto: {
    screen: ProfilePhotoScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
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

const LandingPageStack = createStackNavigator({
  Start: {
    screen: LandingPageScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const phoneAuthStack = createStackNavigator({
  phone: {
    screen: PhoneNumberScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  codeEntry: {
    screen: PhoneConfirmationScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
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
      };
    },
  },
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: DashboardStackNavigator,
});

const AppSwitchNavigator = createSwitchNavigator({
  CreateAccount: CreateAccountStack,
  Auth: phoneAuthStack,
  Landing: LandingPageStack,
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
});
