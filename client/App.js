import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

// Screens
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import LandingPageScreen from './src/screens/LandingPageScreen';
import PhoneNumberEntryScreen from './src/screens/PhoneNumberEntryScreen';
import feedScreen from './src/components/feedScreen';
import phoneAuthScreen from './src/screens/phoneAuthScreen';
import CodeEntryScreen from './src/screens/CodeEntryScreen';

import { Provider, connect } from 'react-redux';
import store from './src/store/store';
import PhoneConfirmationScreen from './src/screens/PhoneConfirmationScreen';

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

const LandingPageScreenStack = createStackNavigator({
  Start: {
    screen: LandingPageScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const AppSwitchNavigator = createSwitchNavigator({
  LandingPageScreen: LandingPageScreenStack,
  latestAuth: phoneAuthStack, // what I worked while you were getting turnt with Navie LOL
  App: AppStack,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default (App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
));
