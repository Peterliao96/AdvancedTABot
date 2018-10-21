import React, { Component } from 'react';
var PropTypes = require('prop-types');
import { StyleSheet, View ,FlatList, TouchableOpacity, ScrollView} from 'react-native'
import Container from '../../components/DrawerContainer'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import ChatList from '../../components/chatlist';
import ChatScreen from '../ChatScreen/ChatScreen';
import ActionBar from 'react-native-action-bar';
import {loadConversation} from '../../actions/loadConversations';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle } from 'react-native-material-ui';
/**
 * Just a centered logout button.
 */
class HomeScreen extends Component {
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

  isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  componentDidMount(){
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        UserId: this.props.auth.userFBData.user.providerData[0].uid
      }
      this.props.loadConversationList(data)
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId
      }
      this.props.loadConversationList(data)
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo);
          const data = {
            UserId: UserInfo.user.myId
          }
          this.props.loadConversationList(data)
        }
      })
    }
  }




  render () {
    const {conversations:{conversations}} = this.props
    const {auth:{FBuser,userFBData}} = this.props
    const {loadConversationList} = this.props;
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
      data={conversations}
      keyExtractor={(item,index) => item.chatId}
      renderItem={({item}) => {
        return (
          <ChatList url={item.avatar} name={item.fullName} lastTime={item.createdAt} lastMsg={item.lastMsg} onPress={() => this.props.navigation.push('ChatScreen')}/>
        )
      }}/>
      </Container>
      </ScrollView>
      //</View>
    )
  }
}

const mapStateToProps = (state) => ({
  conversations:state.conversations,
  auth:state.auth
})

const mapDispatchToProps = (dispatch) => ({
  loadConversationList:data => dispatch(loadConversation(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)

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
