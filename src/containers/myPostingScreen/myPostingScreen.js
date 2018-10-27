import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {loadMyDiaries} from '../../actions/loadDiaries'
import {getMyProfile} from '../../actions/loadMyProfile';
var PropTypes = require('prop-types');
import {connect} from 'react-redux'
import ScrollableHeader from '../../components/scrollableHeader';
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
import CustomButton from '../../components/CustomButton'
class myPostingScreen extends Component{
  static propTypes = {
    logout: PropTypes.func
  }

  static navigationOptions = {
    headerTitle:'My posting',
    headerTintColor: 'white',
    headerStyle:{
      backgroundColor:COLOR.blue500
    },
    headerTitleStyle:{
      color:'#FFF'
    },
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
      this.props.onLoadMyDiaries(data)
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId
      }
      this.props.getProfile(data)
      this.props.onLoadMyDiaries(data)
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo);
          const data = {
            UserId: UserInfo.user.myId
          }
          this.props.getProfile(data)
          this.props.onLoadMyDiaries(data)
        }
      })
    }
  }

  render() {
    const {auth: {userFBData,FBuser,isLoading,isAppReady}} = this.props
    const { user: {profile}} = this.props
    const {diary:{myDiaryList}} = this.props
    const { onLogoutPress,logout ,getProfile} = this.props
    const {navigation} = this.props
    const id = navigation.getParam('id')

    if(id === "3"){
      return (
        <ScrollView>
          <ScrollableHeader name={!this.isEmpty(userFBData) ? userFBData.user.displayName : profile.fullName} description={!this.isEmpty(userFBData) ? userFBData.user.email : profile.email} avatar={!this.isEmpty(userFBData) ? FBuser.avatar : profile.avatar}/>

        </ScrollView>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  diary:state.diary
})

const mapDispatchToProps = (dispatch) => ({
  getProfile: data => {dispatch(getMyProfile(data))},
  onLogoutPress: () => {dispatch(onLogout())},
  onLoadMyDiaries: data => {dispatch(loadMyDiaries(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(myPostingScreen)

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
