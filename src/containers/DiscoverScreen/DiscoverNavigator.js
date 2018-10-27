import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import PostDiaryScreen from '../PostDiaryScreen/PostDiaryScreen';
import DiscoverScreen from './DiscoverScreen'

const DiscoverSwitchPages = createStackNavigator({
  DiscoverScreen:{screen:DiscoverScreen},
  PostDiaryScreen:{screen:PostDiaryScreen}
})

class DiscoverNavigator extends Component{
  render(){
    return(
      <DiscoverSwitchPages />
    )
  }
}

export default DiscoverNavigator;