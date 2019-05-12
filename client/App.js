import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

// Screens
import LandingPageScreen from './src/screens/LandingPageScreen';
import PhoneNumberEntryScreen from './src/screens/PhoneNumberEntryScreen';
import codeVerifyScreen from './src/components/codeVerifyScreen';
import feedScreen from './src/components/feedScreen';
import phoneAuthScreen from './src/screens/phoneAuthScreen';
import codeEntryScreen from './src/screens/codeEntryScreen';

const AuthStack = createStackNavigator({
  phoneNumberEntryRoute: {
    screen: PhoneNumberEntryScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  phCodeVerify: {
    screen: codeVerifyScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const AppStack = createStackNavigator({
  Feed: {
    screen: feedScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const phoneAuthStack = createStackNavigator({
  phone: {
    screen: phoneAuthScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  codeEntry: {
    screen: codeEntryScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const LandingPageScreenStack = createStackNavigator({
  Start: {
    screen: PhoneNumberEntryScreen,
    // screen: LandingPageScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const AppSwitchNavigator = createSwitchNavigator({
  latestAuth: phoneAuthStack, // what I worked while you were getting turnt with Navie LOL
  // LandingPageScreen: LandingPageScreenStack,
  Auth: AuthStack, // same shit as latestAuth
  App: AppStack,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const App = () => <AppContainer />;

export default App;
