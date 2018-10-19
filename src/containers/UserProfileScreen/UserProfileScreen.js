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
import {addFriend} from '../../actions/addFriend';
import PersonHeader from '../../components/PersonHeader';
var PropTypes = require('prop-types');
import CustomButton from '../../components/CustomButton'
import {List, ListItem} from 'react-native-elements';

class UserProfileScreen extends Component{
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

  async _onAddFriend(UserId){
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        FriendId: UserId,
        UserId: this.props.auth.userFBData.user.providerData[0].uid
      }
      this.props.onAddFriend(data)
      this.props.navigation.navigate('AddFriendScreen')
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        FriendId: UserId,
        UserId: this.props.auth.FBuser.UserId
      }
      this.props.onAddFriend(data)
      this.props.navigation.navigate('AddFriendScreen')
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo)
          const data = {
            FriendId: UserId,
            UserId: UserInfo.user.myId
          }
          this.props.onAddFriend(data)
          this.props.navigation.navigate('AddFriendScreen')
        }
      })
    }
  }


  render() {
    const data = [{
      id:1,
      title: 'Bot setting',
      icon:'settings'
    },{
      id:2,
      title:'Edit this bot',
      icon: 'edit'
    },{
      id:3,
      title: 'Help',
      icon: 'help'
    }]
    const {auth: {userFBData}} = this.props
    const {request: {isAddingFriend}} = this.props
    const { onLogoutPress,navigation,onAddFriend } = this.props
    const UserId = navigation.getParam('UserId')
    const avatar = navigation.getParam('avatar')
    const description = navigation.getParam('description')
    const fullName = navigation.getParam('fullName')
    return (
      <ScrollView>
      <View style={{flex:1}}>
        <PersonHeader name={fullName} description={description} avatar={avatar}/>
        <CustomButton
          text={'Add a friend'}
          onPress={this._onAddFriend.bind(this,UserId)}
          isLoading={isAddingFriend}
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
  request: state.request,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  onAddFriend: data => dispatch(addFriend(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(UserProfileScreen)

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
