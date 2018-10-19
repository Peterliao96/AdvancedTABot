import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
var PropTypes = require('prop-types');
import { Marker } from 'react-native-maps';
import { Constants, MapView, Location, Permissions } from 'expo';
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
import CustomButton from '../../components/CustomButton'
export default class locationScreen extends Component{
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: this.props.navigation.getParam('location'),
  };

  static propTypes = {
    logout: PropTypes.func
  }

  static navigationOptions = {
    headerTitle:'My current location',
    headerStyle:{
      backgroundColor:COLOR.blue500
    },
    headerTitleStyle:{
      color:'#FFF'
    },
  }


  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };


  render() {

    const {navigation} = this.props
    const id = navigation.getParam('id')
    const location = navigation.getParam('location')
    if(id === "4"){
      return (
        <MapView
        style={{ flex:1 }}
        region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        onRegionChange={this._handleMapRegionChange}
      >
      <Marker
      coordinate={location.coords}
      title="Hello"
      description="Some descrissfption"
    />
      </MapView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  button: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
