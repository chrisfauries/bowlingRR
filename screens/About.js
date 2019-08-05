import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ExpoConfigView from '@expo/samples/ExpoConfigView';



export default function About() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  // return (<View><Text>Hello World!</Text></View>)
  return <ExpoConfigView />;
}

About.navigationOptions = {
  title: 'About',
};
