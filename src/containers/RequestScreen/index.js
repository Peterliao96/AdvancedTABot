import {createStackNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {Dimensions,View, ActivityIndicator} from 'react-native'
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
import { SearchBar } from 'react-native-elements'
const deviceW = Dimensions.get('window').width
import Container from '../../components/DrawerContainer';
import AddFriendScreen from '../addFriendScreen/addFriendScreen';
import FriendGroupScreen from '../FriendGroupScreen/FriendGroupScreen';
import FriendProfileScreen from '../friendProfileScreen/friendProfileScreen';
import CreateBotScreen from '../CreateBotScreen/CreateBotScreen';
import RequestScreen from './RequestScreen';
import UserProfileScreen from '../UserProfileScreen/UserProfileScreen';
import BotsProfileScreen from '../BotsProfileScreen/BotsProfileScreen';
import {connect} from 'react-redux';
import {searchUser} from '../../actions/loadSearchUser';



const SwitchTabs = createMaterialTopTabNavigator({
  RequestScreen:{
    screen:RequestScreen,
    navigationOptions:{
    title:'Request'
  }},
  AddFriendScreen:{
    screen:createStackNavigator({
      AddFriendScreen: {
        screen: AddFriendScreen
      },
      UserProfileScreen:{
        screen: UserProfileScreen
      },
      CreateBotScreen:{
        screen: CreateBotScreen
      }
    },{
      headerMode: 'none'
    }),
    navigationOptions:{
      title:'Add Friends'
    }
  },
  FriendGroupScreen:{
    screen:createStackNavigator({
      FriendGroupScreen:{
        screen: FriendGroupScreen
      },
      BotsProfileScreen:{
        screen: BotsProfileScreen
      },
      friendProfileScreen:{
        screen: FriendProfileScreen
      }
    },{
      headerMode: 'none'
    }),
    navigationOptions:{
      title:'Contact'
    }
  }
},{
  tabBarPosition:'top',
  swipeEnabled:true,
  initialRouteName:'RequestScreen',
  tabBarOptions:{
    upperCaseLabel:false,
    style:{
      borderColor:COLOR.blue500,
      borderWidth:0,
    },
    tabStyle:{
      borderColor:COLOR.blue500,
      borderWidth:0
    }
  },
})

class RequestScreenNavigator extends Component{


  _searchUser(text){
    const data = {
      fullName: text
    }
    this.props.onSearchUser(data)
  }

  render(){
    const {user: {isSearchUserLoading, userInfo}} = this.props
    const { onSearchUser } = this.props
    return(
      <Container>
      <SearchBar
        ref={search => this.search = search}
        clearIcon={{ color: COLOR.blue300 }}
        showLoading={isSearchUserLoading}
        showLoadingIcon={isSearchUserLoading}
        onChangeText={(text) => this._searchUser(text)}
        platform="ios"
        cancelButtonTitle="Cancel"
        containerStyle={{backgroundColor:COLOR.blue500,width:deviceW, marginTop:0,height:80,borderWidth:1,borderColor:COLOR.blue500}}
        inputContainerStyle={{backgroundColor:COLOR.blue100,marginTop:40}}
        inputStyle={{backgroundColor:COLOR.blue100,marginTop:40}}
        placeholder='Search by full name' />
      <SwitchTabs/>
      </Container>
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  onSearchUser: SearchData => dispatch(searchUser(SearchData))
})

export default connect(mapStateToProps,mapDispatchToProps)(RequestScreenNavigator)
