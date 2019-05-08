import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import startScreen from './src/components/startScreen';
import phoneEntryScreen from './src/components/phoneEntryScreen';
import codeVerifyScreen from './src/components/codeVerifyScreen';
import feedScreen from './src/components/feedScreen';
import firebase from 'react-native-firebase';

const AuthStack = createStackNavigator({
  phEntry: {
    screen: phoneEntryScreen,
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

const IntroStack = createStackNavigator({
  Start: {
    screen: startScreen,
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

const AppSwitchNavigator = createSwitchNavigator({
  Intro: IntroStack,
  Auth: AuthStack,
  App: AppStack,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default (App = () => <AppContainer />);

// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   async componentDidMount() {
//     // TODO: You: Do firebase things
//     // const { user } = await firebase.auth().signInAnonymously();
//     // console.warn('User -> ', user.toJSON());

//     // await firebase.analytics().logEvent('foo', { bar: '123'});
//   }

//   render() {
//     return (

//     );
//   }
// }
