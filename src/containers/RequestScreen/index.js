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
import FriendPostingScreen from '../friendPostingScreen/friendPostingScreen';
import CreateBotScreen from '../CreateBotScreen/CreateBotScreen';
import BotSettingScreen from '../BotSettingScreen/BotSettingScreen';
import RequestScreen from './RequestScreen';
import editBotScreen from '../editBotScreen/editBotScreen';
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
      BotSettingScreen:{
        screen:BotSettingScreen
      },
      editBotScreen:{
        screen: editBotScreen
      },
      friendProfileScreen:{
        screen: FriendProfileScreen
      },
      friendPostingScreen:{
        screen: FriendPostingScreen
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
    showLabel:true,
    upperCaseLabel:false,
    style:{
      borderColor:COLOR.blue500,
      borderWidth:0,
      height:90
    },
    tabStyle:{
      borderColor:COLOR.blue500,
      borderWidth:0
    },
    labelStyle:{
      marginTop:50
    },
    indicatorStyle:{
      borderColor:'white',
      borderWidth:0.5
    },
    iconStyle:{
      borderColor:'white',
      borderWidth:0.5
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
