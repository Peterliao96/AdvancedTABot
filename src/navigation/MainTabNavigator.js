import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Dimensions} from 'react-native'
import HomeScreen from '../containers/HomeScreen';
import SettingsScreen from '../containers/SettingsScreen';

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class MainTabNavigator extends Component {
  state= {
    selectedTab: 'home',
    isLoggedIn:true,
    isAppReady:true
  };

  render() {
    return (
      <TabNavigator style={styles.container}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
          badgeText="1"
          onPress={() => this.setState({selectedTab: 'home'})}>
          <HomeScreen
            logout={() => this.setState({ isLoggedIn: false, isAppReady: false })}
          />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'setting'}
          title="Settings"
          selectedTitleStyle={{color: "#3496f0"}}
          renderIcon={() => <Icon name="cog" size={px2dp(22)} color="#666"/>}
          renderSelectedIcon={() => <Icon name="cog" size={px2dp(22)} color="#3496f0"/>}
          onPress={() => this.setState({selectedTab: 'setting'})}>
          <SettingsScreen
            logout={() => this.setState({ isLoggedIn: false, isAppReady: false })}
          />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
