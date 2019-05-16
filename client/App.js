import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

// Screens
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import LandingPageScreen from './src/screens/LandingPageScreen';
import feedScreen from './src/screens/feedScreen';

import { Provider } from 'react-redux';
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
  Start: {
    screen: LandingPageScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
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

const AppSwitchNavigator = createSwitchNavigator({
  latestAuth: phoneAuthStack,
  App: AppStack,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default (App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
));
