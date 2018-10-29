import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import {connect} from 'react-redux'
import {loadDiaries} from '../../actions/loadDiaries'
import {getMyProfile} from '../../actions/loadMyProfile';
import ScrollableHeader from '../../components/scrollableHeader';
var PropTypes = require('prop-types');
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
import CustomButton from '../../components/CustomButton'
import  Icon  from 'react-native-vector-icons/FontAwesome';

class DiscoverScreen extends Component{
  static propTypes = {
    logout: PropTypes.func
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle:'Discover',
      headerStyle:{
        backgroundColor:COLOR.blue500
      },
      headerTitleStyle:{
        color:'#FFF'
      },
      headerRight:(
        <Icon name='edit'
        size={20}
        onPress={() => navigation.push('PostDiaryScreen',{avatar:navigation.getParam('avatar')})}
        color="#fff"
      />
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


componentDidMount(){
  if(!this.isEmpty(this.props.auth.userFBData)){
    const data = {
      UserId: this.props.auth.userFBData.user.providerData[0].uid
    }
    this.props.getProfile(data)
    this.props.onLoadDiaries(data)
    this.props.navigation.setParams({
      avatar:this.props.auth.FBuser.avatar
    })
  } else if (!this.isEmpty(this.props.auth.FBuser)){
    const data = {
      UserId: this.props.auth.FBuser.UserId
    }
    this.props.getProfile(data)
    this.props.onLoadDiaries(data)
    this.props.navigation.setParams({
      avatar:this.props.auth.FBuser.avatar
    })
  } else {
    AsyncStorage.getItem('UserInfo').then(UserInfo => {
      if(UserInfo){
        var UserInfo = JSON.parse(UserInfo);
        const data = {
          UserId: UserInfo.user.myId
        }
        this.props.getProfile(data)
        this.props.onLoadDiaries(data)
        this.props.navigation.setParams({
          avatar:this.props.auth.FBuser.avatar
        })
      }
    })
  }
}

  render() {

    const {auth: {userFBData,FBuser,isLoading,isAppReady}} = this.props
    const { user: {profile}} = this.props
    const {diary:{diaryList}} = this.props
    const { onLogoutPress,logout ,getProfile,navigation,onLoadDiaries} = this.props
    //const avatar = navigation.setParams({avatar:!this.isEmpty(userFBData) ? FBuser.avatar : profile.avatar})
    return (
      <ScrollView>
        <ScrollableHeader name={!this.isEmpty(userFBData) ? userFBData.user.displayName : profile.fullName} description={!this.isEmpty(userFBData) ? userFBData.user.email : profile.email} avatar={!this.isEmpty(userFBData) ? FBuser.avatar : profile.avatar}/>
      </ScrollView>
    )
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
  onLoadDiaries: data => {dispatch(loadDiaries(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(DiscoverScreen)

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
