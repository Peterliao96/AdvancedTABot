import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
//import AdvancedTABot from './src/app';
import { Provider } from 'react-redux';
import {Navigation} from 'react-native-navigation';
import Routes from './src/routes';
import store from './src/store';
console.disableYellowBox = true
export default class AdvancedTABot extends Component {


  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('AdvancedTABot',() => AdvancedTABot);
