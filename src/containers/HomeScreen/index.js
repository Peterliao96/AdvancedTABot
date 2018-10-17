import React, {Component} from 'react';
import HomeScreen from './HomeScreen';
import { TouchableOpacity,Button} from 'react-native';
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
import {createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import ChatScreen from '../ChatScreen/ChatScreen';
import GroupChatSetupScreen from '../GroupChatSetupScreen/GroupChatSetupScreen';




export default class HomeScreenNavigator extends Component{

  constructor(props){
    super(props)
  }


  render(){

    const SwitchPages = createStackNavigator({
      HomeScreen:{
        screen: HomeScreen
      },
      //addFriendScreen: {screen: addFriendScreen},
      ChatScreen:{
        screen: ChatScreen
      },
      GroupChatSetupScreen:{
        screen: GroupChatSetupScreen,
      }
    },{
      initialRouteName:'HomeScreen'
    })

    return (
      <SwitchPages/>
    )
  }
}
