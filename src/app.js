/* @flow */
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import {Navigation} from 'react-native-navigation';
import Routes from './routes';
import store from './store';
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
