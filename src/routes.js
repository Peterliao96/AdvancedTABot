/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, AsyncStorage} from 'react-native';
import { SearchBar } from 'react-native-elements'
//import nodejs from 'nodejs-mobile-react-native';
import {createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import AuthScreen from './containers/AuthScreen'
import SettingsScreen from './containers/SettingsScreen';
import RequestScreenNavigator from './containers/RequestScreen';
import HomeScreenNavigator from './containers/HomeScreen';
import DiscoverScreen from './containers/DiscoverScreen/DiscoverScreen';
const deviceW = Dimensions.get('window').width
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux';
import { simulateLoginProcess } from './actions/auth';
const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}



class AppNavigator extends Component {

  state = {
    selectedTab: 'home',
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false // Has the app completed the login animation?
  }

  /**
   * Two login function that waits 1000 ms and then authenticates the user succesfully.
   * In your real app they should be replaced with an API call to you backend.
   */
  _simulateLogin = (data) => {
    this.props.onSimulateLogin(data)
    //this.setState({ isLoading: true })
    //setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  _simulateSignup = (username, password, fullName) => {
    this.setState({ isLoading: true })
    setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  async isTokenExisted(){
    var UserInfo = await AsyncStorage.getItem('UserInfo');
    console.log(UserInfo)
    UserInfo = JSON.parse(UserInfo);
    if(UserInfo){
      if(UserInfo.token){
        this.setState({isAppReady:true})
        return true
      }
      this.setState({isAppReady:false})
      return false
    }
    this.setState({isAppReady:false})
    return false
  }




  render() {
    const { auth: {isLoggedIn, isLoading} } = this.props
    const { onSimulateLogin } = this.props
    if(this.isTokenExisted && this.state.isAppReady){
      return (
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Chat"
            selectedTitleStyle={{color: "#3496f0"}}
            renderIcon={() => <Icon name="comment" size={px2dp(22)} color="#666"/>}
            renderSelectedIcon={() => <Icon name="comment" size={px2dp(22)} color="#3496f0"/>}
            badgeText="1"
            onPress={() => this.setState({selectedTab: 'home'})}>
              <HomeScreenNavigator />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'request'}
            title="Request"
            selectedTitleStyle={{color: "#3496f0"}}
            renderIcon={() => <Icon name="users" size={px2dp(22)} color="#666"/>}
            renderSelectedIcon={() => <Icon name="users" size={px2dp(22)} color="#3496f0"/>}
            onPress={() => this.setState({selectedTab: 'request'})}>
            <RequestScreenNavigator/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'discover'}
            title="Discover"
            selectedTitleStyle={{color: "#3496f0"}}
            renderIcon={() => <Icon name="compass" size={px2dp(22)} color="#666"/>}
            renderSelectedIcon={() => <Icon name="compass" size={px2dp(22)} color="#3496f0"/>}
            onPress={() => this.setState({selectedTab: 'discover'})}>
            <DiscoverScreen

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
      )
    } else if (this.state.isAppReady) {
      console.log('Hi!')
      return (
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="Chat"
            selectedTitleStyle={{color: "#3496f0"}}
            renderIcon={() => <Icon name="comment" size={px2dp(22)} color="#666"/>}
            renderSelectedIcon={() => <Icon name="comment" size={px2dp(22)} color="#3496f0"/>}
            badgeText="1"
            onPress={() => this.setState({selectedTab: 'home'})}>
              <HomeScreenNavigator />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'request'}
            title="Request"
            selectedTitleStyle={{color: "#3496f0"}}
            renderIcon={() => <Icon name="users" size={px2dp(22)} color="#666"/>}
            renderSelectedIcon={() => <Icon name="users" size={px2dp(22)} color="#3496f0"/>}
            onPress={() => this.setState({selectedTab: 'request'})}>
            <RequestScreenNavigator/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'discover'}
            title="Discover"
            selectedTitleStyle={{color: "#3496f0"}}
            renderIcon={() => <Icon name="compass" size={px2dp(22)} color="#666"/>}
            renderSelectedIcon={() => <Icon name="compass" size={px2dp(22)} color="#3496f0"/>}
            onPress={() => this.setState({selectedTab: 'discover'})}>
            <DiscoverScreen

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
      )
    } else {
      return (
        <AuthScreen
          login={this._simulateLogin}
          signup={this._simulateSignup}
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
      )
    }
  }
}

mapStateToProps = (state) => ({
  auth: state.auth
})

mapDispatchToProps = (dispatch) => ({
  onSimulateLogin: data => dispatch(simulateLoginProcess(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(AppNavigator)

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
