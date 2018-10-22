import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {connect} from 'react-redux'
import {onSwitchState,fixText} from '../../actions/switchBotSettingState'
import { TextField } from 'react-native-material-textfield';
var PropTypes = require('prop-types');
import PersonHeader from '../../components/PersonHeader';
import CustomButton from '../../components/CustomButton'
import {List, ListItem} from 'react-native-elements';

class BotSettingScreen extends Component{
  static propTypes = {
    logout: PropTypes.func
  }

  isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  async _switchState(value,id){
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        BotId: this.props.navigation.getParam('UserId'),
        UserId: this.props.auth.userFBData.user.providerData[0].uid,
        value:value,
        id:id
      }
      this.props.switchState(data)
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        BotId: this.props.navigation.getParam('UserId'),
        UserId: this.props.auth.FBuser.UserId,
        value:value,
        id:id
      }
      this.props.switchState(data)
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo)
          const data = {
            BotId: this.props.navigation.getParam('UserId'),
            UserId: UserInfo.user.myId,
            value:value,
            id:id
          }
          this.props.switchState(data)
        }
      })
    }
  }

  _changeText(text,BotId){
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        UserId: this.props.auth.userFBData.user.providerData[0].uid,
        BotId : BotId,
        autoReply: text
      }
      this.props.changeText(data)
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId,
        BotId : BotId,
        autoReply: text
      }
      this.props.changeText(data)
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        var UserInfo = JSON.parse(UserInfo);
        const data = {
          UserId: UserInfo.user.myId,
          BotId : BotId,
          autoReply: text
        }
        this.props.changeText(data)
      })
    }
  }


  render() {
    const data = [{
      id:"1",
      title:"Training",
      icon:"motorcycle"
    },{
      id:"2",
      title:"Push notifications",
      icon:"notifications"
    },{
      id:"3",
      title:"Auto reply (customized)",
      icon:"reply"
    }]
    const {bot:{BotsArr}} = this.props
    const { onLogoutPress,navigation,switchState,changeText } = this.props
    const UserId = navigation.getParam('UserId')
    const avatar = navigation.getParam('avatar')
    const description = navigation.getParam('description')
    const fullName = navigation.getParam('fullName')
    const index = navigation.getParam('index');

    return (
      <View style={{flex:1}}>
        <PersonHeader name={fullName} description={description} avatar={avatar}/>
        <List
      containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if(item.id === '1'){
            return (
              <TouchableOpacity>
              <ListItem
                title={item.title}
                leftIcon={{name:item.icon}}
                switchButton
                switched={BotsArr[index].TrainState}
                hideChevron
                onSwitch={(value) => this._switchState(value,item.id)}
                containerStyle={{ borderBottomWidth: 0 }}
              />
              </TouchableOpacity>
            )
          }else if (item.id === '2'){
            return (
              <TouchableOpacity>
              <ListItem
                title={item.title}
                leftIcon={{name:item.icon}}
                switchButton
                switched={BotsArr[index].NotificationState}
                hideChevron
                onSwitch={(value) => this._switchState(value,item.id)}
                containerStyle={{ borderBottomWidth: 0 }}
              />
              </TouchableOpacity>
            )
          } else if (item.id === '3'){
            return (
              <TouchableOpacity>
              <ListItem
                title={item.title}
                leftIcon={{name:item.icon}}
                switchButton
                switched={BotsArr[index].AutoReplyState}
                hideChevron
                onSwitch={(value) => this._switchState(value,item.id)}
                containerStyle={{ borderBottomWidth: 0 }}
              />
              </TouchableOpacity>
            )
          }
        }}
        keyExtractor={(item,index) => item.id}
      />
    </List>
    <TextField
      label='Auto reply content'
      autoCapitalize='none'
      value={BotsArr[index].autoReply}
      onChangeText={text => this._changeText(text,UserId)}
      inputContainerStyle={{
        width: 350,
        paddingHorizontal: 16,
        borderBottomWidth:1,
        marginHorizontal:10,
        alignSelf:'center'
      }}
      />
        <CustomButton
          text={'Go back'}
          onPress={() => this.props.navigation.goBack()}
          buttonStyle={styles.goBackButton}
          textStyle={styles.buttonText}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  bot:state.bot,
  auth:state.auth
})

const mapDispatchToProps = (dispatch) => ({
  switchState:data => {dispatch(onSwitchState(data))},
  changeText:data => {dispatch(fixText(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(BotSettingScreen)

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
  goBackButton: {
    backgroundColor: '#1976D2',
    marginHorizontal: 20,
    marginVertical:30
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
