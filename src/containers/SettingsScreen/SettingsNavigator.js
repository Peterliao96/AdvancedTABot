import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import SettingsScreen from './index'
import MoreScreen from '../MoreScreen/MoreScreen';
import myPostingScreen from '../myPostingScreen/myPostingScreen';
import locationScreen from '../locationScreen/locationScreen'
import {createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import {connect} from 'react-redux';

const SettingsSwitchPages = createStackNavigator({
  SettingsScreen:{screen:SettingsScreen},
  MoreScreen:{screen:MoreScreen},
  myPostingScreen:{screen:myPostingScreen},
  locationScreen: {screen:locationScreen}
})

class SettingsNavigator extends Component{

  render() {

    const {auth:{isLoggedIn,isAppReady}} = this.props
    return (
      <SettingsSwitchPages/>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps,null)(SettingsNavigator)
