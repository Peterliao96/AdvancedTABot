import React from 'react';
var PropTypes = require('prop-types');
import {View, Image, Text, TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import moment from 'moment'
import Swipeout from 'react-native-swipeout';
import { Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem,ListItem,List } from "native-base";
var width = Dimensions.get('window').width; //full width
const ChatList = (props) => {
  let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: props.deleteItem
    }];

  return (
  <ListItem height={80}>
  <Swipeout right={swipeBtns}
        autoClose='true'
        backgroundColor= 'transparent'>
  <TouchableOpacity onPress={props.onPress}>
  <View style={{flexDirection:'row'}}>
    <Image style={{width:60,
    height:60,
    borderRadius:30,
    marginLeft:10,
    marginTop:3}} source={{uri:props.url}} />
    <View style={{flexDirection:'column'}}>
      <View style={{flexDirection: 'row'}}>
      <Text
        style={{
          backgroundColor: 'transparent',
          fontSize: 17,
          color: '#000',
          fontWeight: 'bold',
          marginLeft:15,
          marginTop:7
        }}>
        {props.name}
        </Text>
        <Text style={{
          backgroundColor: 'transparent',
          fontSize: 12,
          color: '#000',
          marginLeft:120,
          marginTop:10
        }}>
          {moment(props.lastTime).from(Date.now())}
          </Text>
        </View>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 17,
            color: '#000',
            marginLeft:15,
            marginTop:7
          }}>
          {props.lastMsg}
          </Text>
      </View>
    </View>
  </TouchableOpacity>
  </Swipeout>
  </ListItem>
  )
}

export default ChatList;
