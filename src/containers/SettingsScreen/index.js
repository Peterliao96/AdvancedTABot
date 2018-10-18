import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  FlatList,
  TouchableOpacity
} from 'react-native';
import PersonHeader from '../../components/PersonHeader';
var PropTypes = require('prop-types');
import {connect} from 'react-redux';
import {getMyProfile} from '../../actions/loadMyProfile';
import {List, ListItem} from 'react-native-elements';
import CustomButton from '../../components/CustomButton'
class SettingsScreen extends Component{

  static propTypes = {
    logout: PropTypes.func
  }


  async _onLogout(){
    AsyncStorage.removeItem('UserInfo').then(() => {
      console.log('Token is removed')
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


  componentDidMount(){
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        UserId: this.props.auth.userFBData.user.providerData[0].uid
      }
      this.props.getProfile(data)
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo);
          const data = {
            UserId: UserInfo.user.myId
          }
          this.props.getProfile(data)
        }
      })
    }
  }




  render() {
    const data = [{
      id: 1,
      title: 'Setting',
      icon: 'settings'
    },{
      id:2,
      title: 'Edit my profile',
      icon: 'edit'
    },{
      id:3,
      title: 'My posting',
      icon: 'image'
    },{
      id:4,
      title: 'Help',
      icon: 'help'
    }]
    const {auth: {userFBData,FBuser}} = this.props
    const { user: {profile}} = this.props
    const { onLogoutPress,logout ,getProfile} = this.props
    return (
      <View style={{flex:1}}>
        <PersonHeader name={!this.isEmpty(userFBData) ? userFBData.user.displayName : profile.fullName} description={!this.isEmpty(userFBData) ? userFBData.user.email : profile.email} avatar={!this.isEmpty(userFBData) ? FBuser.avatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}/>
        <List
      containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
            <ListItem
              title={item.title}
              leftIcon={{name: item.icon}}
              onPress={() => this.props.navigation.push('MoreScreen',{id:item.id})}
              containerStyle={{ borderBottomWidth: 0 }}
            />
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item,index) => item.id}
      />
    </List>
        <CustomButton
          text={'Logout'}
          onPress={logout}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  getProfile: data => dispatch(getMyProfile(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(SettingsScreen)

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
