import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import SettingsScreen from './index'
import MoreScreen from '../MoreScreen/MoreScreen';
import {createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';

const SettingsSwitchPages = createStackNavigator({
  SettingsScreen:{screen:SettingsScreen},
  MoreScreen:{screen:MoreScreen}
},{
  headerMode: 'none'
})
export default class SettingsNavigator extends Component{

  render() {
    return (
      <SettingsSwitchPages/>
    )
  }
}
