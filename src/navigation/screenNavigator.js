import React, { Component } from 'react';
import { StyleSheet, View ,FlatList} from 'react-native'
import {createStackNavigator} from 'react-navigation';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import ChatScreen from '../containers/ChatScreen/ChatScreen'
/**
 * Just a centered logout button.
 */
const SwitchPages = createStackNavigator({
  HomeScreen:{screen: HomeScreen},
  ChatScreen:{screen: ChatScreen}
})
export default class ScreenNavigator extends Component {


  render () {

    return (
      <SwitchPages/>
    )
  }
}
