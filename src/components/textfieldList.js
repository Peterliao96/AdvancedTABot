import { TextField } from 'react-native-material-textfield';
import React, {Component} from 'react';
import {
  View,
  AsyncStorage,
  StatusBar,
  Text,
  AppRegistry,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  TextInput,
  ActivityIndicator
} from 'react-native';

class TextfieldList extends Component {
  constructor(props){
    super(props)
    this.state = {
      phone:''
    }
  }
  render(){
    let { phone } = this.state;
    return(
      <TextField
      label={this.props.label}
      value={phone}
      autoCapitalize='none'
      onChangeText={(phone) => this.setState({phone})}
      inputContainerStyle={{
        width: 175,
        paddingHorizontal: 16,
        borderBottomWidth:1,
        marginHorizontal:10
      }}
      />
    )
  }
}

export default TextfieldList;
