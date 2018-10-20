import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
import PersonHeader from '../../components/PersonHeader';
var PropTypes = require('prop-types');
import {connect} from 'react-redux';
import {onLogout}from '../../actions/auth';
import {getMyProfile} from '../../actions/loadMyProfile';
import {List, ListItem} from 'react-native-elements';
import CustomButton from '../../components/CustomButton'
class SettingsScreen extends Component{

  constructor(props){
    super(props)
  }

  static navigationOptions = {
    headerTitle:'My profile',
    headerStyle:{
      backgroundColor:COLOR.blue500
    },
    headerTitleStyle:{
      color:'#FFF'
    },
  }


  async _onLogout(){
    if(!this.isEmpty(this.props.auth.userFBData)){
      this.props.onLogoutPress()
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      this.props.onLogoutPress()
    } else {
      AsyncStorage.removeItem('UserInfo').then(() => {
        console.log('Token is removed')
        this.props.onLogoutPress()
      })
    }
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
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId
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

  async SwitchPages(id){
    if(id === '1'){
      this.props.navigation.push('MoreScreen',{id:id})
    } else if (id === '2'){
      this.props.navigation.push('MoreScreen',{id:id})
    } else if( id === '3'){
      this.props.navigation.push('MoreScreen',{id:id})
    } else if (id === '4'){
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          locationResult: 'Permission to access location was denied',
          location,
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.props.navigation.push('locationScreen',{id:id,location:location})
    } else if (id === '5'){
      this.props.navigation.push('MoreScreen',{id:id})
    }
  }




  render() {
    const data = [{
      id: "1",
      title: 'Setting',
      icon: 'settings'
    },{
      id:"2",
      title: 'Edit my profile',
      icon: 'edit'
    },{
      id:"3",
      title: 'My posting',
      icon: 'image'
    },{
      id:"4",
      title: 'My current location',
      icon: 'map'
    },{
      id:"5",
      title: 'Help',
      icon: 'help'
    }]
    const {auth: {userFBData,FBuser,isLoading,isAppReady}} = this.props
    const { user: {profile}} = this.props
    const { onLogoutPress,logout ,getProfile} = this.props
    return (
      <View style={{flex:1}}>
        <PersonHeader name={!this.isEmpty(userFBData) ? userFBData.user.displayName : profile.fullName} description={!this.isEmpty(userFBData) ? userFBData.user.email : profile.email} avatar={!this.isEmpty(userFBData) ? FBuser.avatar : profile.avatar}/>
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
              onPress={this.SwitchPages.bind(this,item.id)}
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
          onPress={this._onLogout.bind(this)}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          isLoading={isLoading}
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
  getProfile: data => {dispatch(getMyProfile(data))},
  onLogoutPress: () => {dispatch(onLogout())}
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
