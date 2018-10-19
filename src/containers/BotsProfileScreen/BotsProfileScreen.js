import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {deleteBot} from '../../actions/deleteBot';
import PersonHeader from '../../components/PersonHeader';
var PropTypes = require('prop-types');
import CustomButton from '../../components/CustomButton'
import {List, ListItem} from 'react-native-elements';

class BotsProfileScreen extends Component{
  static propTypes = {
    logout: PropTypes.func
  }

  static navigationOptions = {
    header: null,
  };


  async _onLogout(){
    AsyncStorage.removeItem('UserInfo').then(() => {
      this.props.logout()
    })
  }

  isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  async _deleteBot(UserId){
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        BotId: UserId,
        UserId: this.props.auth.userFBData.user.providerData[0].uid
      }
      this.props.removeBot(data)
      this.props.navigation.goBack()
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        BotId: UserId,
        UserId: this.props.auth.FBuser.UserId
      }
      this.props.removeBot(data)
      this.props.navigation.goBack()
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo)
          const data = {
            BotId: UserId,
            UserId: UserInfo.user.myId
          }
          this.props.removeBot(data)
          this.props.navigation.goBack()
        }
      })
    }
  }


  render() {
    const data = [{
      id:"1",
      title: 'Bot setting',
      icon:'settings'
    },{
      id:"2",
      title:'Edit this bot',
      icon: 'edit'
    },{
      id:"3",
      title: 'Help',
      icon: 'help'
    }]
    const {auth: {userFBData}} = this.props
    const {bot: {isDeleting}} = this.props
    const { onLogoutPress,navigation,removeBot } = this.props
    const UserId = navigation.getParam('UserId')
    const avatar = navigation.getParam('avatar')
    const description = navigation.getParam('description')
    const fullName = navigation.getParam('fullName')
    return (
      <ScrollView>
      <View style={{flex:1}}>
        <PersonHeader name={fullName} description={description} avatar={avatar}/>
        <List
      containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
            <ListItem
              leftIcon={{name:item.icon}}
              title={item.title}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.props.navigation.push('editBotScreen',{id:item.id,UserId:UserId,avatar:avatar,description:description,fullName:fullName})}
            />
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item,index) => item.id}
      />
    </List>
        <CustomButton
          text={'Delete this bot'}
          onPress={this._deleteBot.bind(this,UserId)}
          isLoading={isDeleting}
          buttonStyle={styles.deleteButton}
          textStyle={styles.buttonText}
        />
        <CustomButton
          text={'Go back'}
          onPress={() => this.props.navigation.goBack()}
          buttonStyle={styles.goBackButton}
          textStyle={styles.buttonText}
        />
      </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  bot: state.bot,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  removeBot: data => dispatch(deleteBot(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(BotsProfileScreen)

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
  deleteButton: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  goBackButton: {
    backgroundColor: '#1976D2',
    marginHorizontal: 20,
    marginTop: 0
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
