import React, {Component} from 'react';

import {
  View,
  AsyncStorage,
  StatusBar,
  Text,
  AppRegistry,
  StyleSheet,
  Platform
} from 'react-native';
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';
import CustomView from '../../components/CustomView';
import CustomActions from '../../components/CustomActions';
import {connect} from 'react-redux';
import {loadMessages,createMessage,autoReplyMessage} from '../../actions/loadMessages';
const message = require('../../components/constant').message;
const oldMessage = require('../../components/constant').oldMessage;
import Container from '../../components/DrawerContainer';
import {Avatar} from 'react-native-elements'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle } from 'react-native-material-ui';
import { Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem } from "native-base";

class ChatScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };
    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle:navigation.getParam('name'),
      headerTintColor: 'white',
      headerStyle:{
        backgroundColor:COLOR.blue500
      },
      headerTitleStyle:{
        color:'#FFF'
      },
      headerRight:(
        <Avatar  size="small" rounded source={{uri:navigation.getParam('myAvatar')}}/>
    ),
    headerRightContainerStyle:{
      marginRight:20
    }
  }
}

  isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  componentWillMount() {
    this._isMounted = true;
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        UserId: this.props.auth.userFBData.user.providerData[0].uid,
        chatId:this.props.navigation.getParam('chatId')
      }
      this.props.OnLoadMsg(data)
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId,
        chatId:this.props.navigation.getParam('chatId')
      }
      this.props.OnLoadMsg(data)
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo);
          const data = {
            UserId: UserInfo.user.myId,
            chatId:this.props.navigation.getParam('chatId')
          }
          this.props.OnLoadMsg(data)
        }
      })
    }

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, oldMessage),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        UserId: this.props.auth.userFBData.user.providerData[0].uid,
        chatId:this.props.navigation.getParam('chatId'),
        message:messages[0]
      }
      this.props.appendMsg(data)
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId,
        chatId:this.props.navigation.getParam('chatId'),
        message:messages[0]
      }
      this.props.appendMsg(data)
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo);
          const data = {
            UserId: UserInfo.user.myId,
            chatId:this.props.navigation.getParam('chatId'),
            message:messages[0]
          }
          this.props.appendMsg(data)
        }
      })
    }
    /*this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });*/

    // for demo purpose
    for(var i = 0;i<this.props.bot.BotsArr.length;i++){
      if(this.props.bot.BotsArr[i].UserId === this.props.navigation.getParam('BotId')){
        let TargetBot = this.props.bot.BotsArr[i]
        if(TargetBot.AutoReplyState){
          this.answerDemo(messages,TargetBot.autoReply);
        }
        break;
      }
    }
  }

  answerDemo(messages,reply) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('好漂亮的图片!');
          } else if (messages[0].location) {
            this.onReceive('我最喜欢的地方!');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive(reply);
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        UserId: this.props.auth.userFBData.user.providerData[0].uid,
        chatId:this.props.navigation.getParam('chatId'),
        BotId : this.props.navigation.getParam('BotId'),
        text: text
      }
      this.props.appendReMsg(data)
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId,
        chatId:this.props.navigation.getParam('chatId'),
        BotId : this.props.navigation.getParam('BotId'),
        text: text
      }
      this.props.appendReMsg(data)
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo);
          const data = {
            UserId: UserInfo.user.myId,
            chatId:this.props.navigation.getParam('chatId'),
            BotId : this.props.navigation.getParam('BotId'),
            text: text
          }
          this.props.appendReMsg(data)
        }
      })
    }
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };

  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };

  render(){
    const {auth:{userFBData,FBuser}} = this.props;
    const {navigation,OnLoadMsg,appendMsg,appendReMsg} = this.props;
    return (
      <Container>
          <StatusBar animated={true} backgroundColor="rgba(0, 0, 0, 0.2)" translucent />

          <GiftedChat
      messages={this.props.messages[navigation.getParam('chatId')]}
      onSend={this.onSend}
      //loadEarlier={this.state.loadEarlier}
      //onLoadEarlier={this.onLoadEarlier}
      //isLoadingEarlier={this.state.isLoadingEarlier}

      user={{
        _id: this.props.navigation.getParam('id'), // sent messages should have same user._id
        name: this.props.navigation.getParam('myName'),
        avatar: this.props.navigation.getParam('myAvatar')
      }}

      renderActions={this.renderCustomActions}
      renderBubble={this.renderBubble}
      renderSystemMessage={this.renderSystemMessage}
      renderCustomView={this.renderCustomView}
      renderFooter={this.renderFooter}
    />
        </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  auth:state.auth,
  bot:state.bot,
  messages:state.messages
})

const mapDispatchToProps = (dispatch) => ({
  OnLoadMsg: data => {dispatch(loadMessages(data))},
  appendMsg: data => {dispatch(createMessage(data))},
  appendReMsg: data => {dispatch(autoReplyMessage(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen)
const styles = StyleSheet.create({
  toolbarContainer:{
    backgroundColor:COLOR.blue300,
    height:75
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#455A64',
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
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  }
});
