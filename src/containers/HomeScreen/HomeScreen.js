import React, { Component } from 'react';
var PropTypes = require('prop-types');
import { StyleSheet, View ,FlatList, TouchableOpacity, ScrollView} from 'react-native'
import Container from '../../components/DrawerContainer'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import ChatList from '../../components/chatlist';
import ChatScreen from '../ChatScreen/ChatScreen';
import ActionBar from 'react-native-action-bar';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle } from 'react-native-material-ui';
/**
 * Just a centered logout button.
 */
export default class HomeScreen extends Component {
  constructor(props){
    super(props)
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle:'TABot Chat',
      headerStyle:{
        backgroundColor:COLOR.blue500
      },
      headerTitleStyle:{
        color:'#FFF'
      },
      headerRight:(
        <Icon name='plus'
        onPress={() => navigation.navigate('GroupChatSetupScreen')}
        color="#fff"
      />
    ),
    headerRightContainerStyle:{
      marginRight:20
    }
  }
}

  static propTypes = {
    logout: PropTypes.func
  }


  toGroupChatSetup(){
    this.props.navigation.navigate('GroupChatSetupScreen');
  }


  render () {

    const data = [{
      id:"1",
      url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      name: 'Peter Liao',
      lastMsg:'Hello world',
      lastTime: '12:59PM'
    },{
      id:"2",
      url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      name: 'Peter Liao',
      lastMsg:'你好',
      lastTime: '4:32PM'
    },{
      id:"3",
      url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      name: 'Peter Liao',
      lastMsg:'你吃完饭了嘛？',
      lastTime: '7:30PM'
    }]
    return (
      //<View style={styles.container}>
      <ScrollView>
      <Container>

      <FlatList
      data={data}
      keyExtractor={(item,index) => item.id}
      renderItem={({item}) => {
        return (
          <ChatList url={item.url} name={item.name} lastTime={item.lastTime} lastMsg={item.lastMsg} onPress={() => this.props.navigation.push('ChatScreen')}/>
        )
      }}/>
      </Container>
      </ScrollView>
      //</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbarContainer:{
    backgroundColor:COLOR.blue300,
    height:75
  },
  button: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
