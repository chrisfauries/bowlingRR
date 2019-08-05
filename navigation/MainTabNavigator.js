import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Scores from '../screens/Scores';
import About from '../screens/About';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'New',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-add`
          : 'md-add'
      }
    />
  ),
};

HomeStack.path = '';

const ScoresStack = createStackNavigator(
  {
    Scores: Scores,
  },
  config
);

ScoresStack.navigationOptions = {
  tabBarLabel: 'Scores',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'} />
  ),
};

ScoresStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: About,
  },
  config
);

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'} />
  ),
};

AboutStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ScoresStack,
  AboutStack,
});

tabNavigator.path = '';

export default tabNavigator;
