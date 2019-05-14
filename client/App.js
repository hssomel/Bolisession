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
import codeVerifyScreen from './src/components/codeVerifyScreen';
import feedScreen from './src/components/feedScreen';

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

const LandingPageScreenStack = createStackNavigator({
  Start: {
    screen: PhoneNumberScreen,
    // screen: LandingPageScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const AppSwitchNavigator = createSwitchNavigator({
  LandingPageScreen: LandingPageScreenStack,
  Auth: AuthStack,
  App: AppStack,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const App = () => <AppContainer />;

export default App;

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
