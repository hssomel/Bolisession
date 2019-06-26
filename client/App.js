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
import NotificationScreen from './src/screens/NotificationScreen';

// import UserBioScreen from './src/screens/UserBioScreen';

import { Provider } from 'react-redux';
import store from './src/store/store';
import PhoneConfirmationScreen from './src/screens/PhoneConfirmationScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import ProfilePhotoScreen from './src/screens/ProfilePhotoScreen';
import AccountTypeScreen from './src/screens/AccountTypeScreen';
import MapScreen from './src/screens/MapScreen';
import PostContentScreen from './src/screens/PostContentScreen';
import MessagingListScreen from './src/screens/MessagingListScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import testScreen from './src/screens/testScreen';

const LandingPageStack = createStackNavigator({
  Start: {
    screen: LandingPageScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const PhoneAuthStack = createStackNavigator({
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

const CreateAccountStack = createStackNavigator({
  Create: {
    screen: CreateAccountScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  ProfilePhoto: {
    screen: ProfilePhotoScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  AccountType: {
    screen: AccountTypeScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const UserProfileStack = createStackNavigator({
  Profile: {
    screen: UserProfileScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  test: {
    screen: testScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

// ---------- Bottom Tab Navigator Stacks ---------------------
const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const NotificationStack = createStackNavigator({
  Notification: {
    screen: NotificationScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const MapStack = createStackNavigator({
  Map: {
    screen: MapScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const PostStack = createStackNavigator({
  Post: {
    screen: PostContentScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

const MessageStack = createStackNavigator({
  Message: {
    screen: MessagingListScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

// -------- End of Bottom Tab Navigator Stacks

// -------- Below is construction of Bottom Tab Navigator ------------
const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-home" color={tintColor} size={30} />
        ),
      },
    },
    Notification: {
      screen: NotificationStack,
      navigationOptions: {
        tabBarLabel: 'Notification',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-notifications" color={tintColor} size={30} />
        ),
      },
    },
    Post: {
      screen: PostStack,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-add" color={tintColor} size={36} />
        ),
      },
    },
    Map: {
      screen: MapStack,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-globe" color={tintColor} size={30} />
        ),
      },
    },
    Message: {
      screen: MessageStack,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-mail" color={tintColor} size={30} />
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

//---------------------------------------------------------------------------

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

const AppDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: DashboardStackNavigator,
    Profile: UserProfileStack,
    Message: {
      screen: MessageStack,
      navigationOptions: {
        drawerLabel: 'Profile',
        drawerIcon: ({ tintColor }) => (
          <Icon name="md-person" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    drawerWidth: 300,
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey',
      // showLabel: false,
    },
  },
);

const AppSwitchNavigator = createSwitchNavigator({
  Landing: LandingPageStack,
  Auth: PhoneAuthStack,
  CreateAccount: CreateAccountStack,
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
