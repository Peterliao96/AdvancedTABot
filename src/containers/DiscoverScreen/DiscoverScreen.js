import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
var PropTypes = require('prop-types');
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
import CustomButton from '../../components/CustomButton'
import  Icon  from 'react-native-vector-icons/FontAwesome';
export default class DiscoverScreen extends Component{
  static propTypes = {
    logout: PropTypes.func
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle:'Discover',
      headerStyle:{
        backgroundColor:COLOR.blue500
      },
      headerTitleStyle:{
        color:'#FFF'
      },
      headerRight:(
        <Icon name='edit'
        onPress={() => navigation.navigate('PostDiaryScreen')}
        color="#fff"
      />
    ),
    headerRightContainerStyle:{
      marginRight:20
    }
  }
}

  render() {
    return (
      <View style={styles.container}>
        <Text> Hello </Text>
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
