import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';

const TabNavigator = createBottomTabNavigator({
  Map: MapScreen,
  Home: HomeScreen,
  MapScreenCopy: MapScreen,
});

export default createAppContainer(TabNavigator);
