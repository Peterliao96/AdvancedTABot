import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
var PropTypes = require('prop-types');
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
import CustomButton from '../../components/CustomButton'
export default class PostDiaryScreen extends Component{
  static propTypes = {
    logout: PropTypes.func
  }

  static navigationOptions = {
    headerTitle:'Diary posting',
    headerStyle:{
      backgroundColor:COLOR.blue500
    },
    headerTitleStyle:{
      color:'#FFF'
    },
  }

  render() {

    const {navigation} = this.props

      return (
        <View>
          <CustomButton
            text={'Logout'}
            onPress={this.props.logout}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      )
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
  button: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
