import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
var PropTypes = require('prop-types');
import {connect} from 'react-redux';
import ChatList from '../../components/chatlist';
import CustomButton from '../../components/CustomButton'
import {getBots} from '../../actions/loadBots';
import {getFriends} from '../../actions/loadFriends';
import {List, ListItem} from 'react-native-elements'
class FriendGroupScreen extends Component{
  static propTypes = {
    logout: PropTypes.func
  }

  static navigationOptions = {
    header: null,
  };

  isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  componentDidMount() {
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        UserId: this.props.auth.userFBData.user.providerData[0].uid
      }
      this.props.listBots(data)
      this.props.listFriends(data)
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId
      }
      this.props.listBots(data)
      this.props.listFriends(data)
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        var UserInfo = JSON.parse(UserInfo);
        const data = {
          UserId: UserInfo.user.myId
        }
        this.props.listBots(data)
        this.props.listFriends(data)
      })
    }
  }


  render() {
    const {auth:{userFBData,FBuser}} = this.props
    const {bot: {isGetBotLoading, BotsArr,isGettingFriendList, friendList}} = this.props
    const {listBots, listFriends} = this.props;
    return (
      <View>
      <Text style={{marginLeft:15,fontSize:17,marginTop:10}}>Bots</Text>
      <List
    containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
  >
    <FlatList
      data={BotsArr}
      renderItem={({ item,index }) => {
        return (
          <TouchableOpacity>
          <ListItem
            roundAvatar
            title={item.fullName}
            subtitle={item.description}
            onPress={() => this.props.navigation.push('BotsProfileScreen',{index:index,UserId:item.UserId, fullName:item.fullName, avatar:item.avatar,description:item.description})}
            avatar={{uri:item.avatar}}
            containerStyle={{ borderBottomWidth: 0 }}
            bottomDivider={true}
          />
          </TouchableOpacity>
        )
      }}
      keyExtractor={(item,index) => item.UserId}
    />
  </List>
  <Text style={{marginLeft:15,fontSize:17,marginTop:10}}>Friends</Text>
  <List>
  <FlatList
    data={friendList}
    renderItem={({ item }) => {
      return (
        <TouchableOpacity>
        <ListItem
          roundAvatar
          title={item.fullName}
          subtitle={item.description}
          onPress={() => this.props.navigation.push('friendProfileScreen',{UserId:item.UserId, fullName:item.fullName, avatar:item.avatar,description:item.description})}
          avatar={{uri:item.avatar}}
          containerStyle={{ borderBottomWidth: 0 }}
          bottomDivider={true}
        />
        </TouchableOpacity>
      )
    }}
    keyExtractor={(item,index) => item.UserId}
  />
  </List>
        <CustomButton
          text={'Logout'}
          onPress={this.props.logout}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  bot: state.bot,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  listBots: data =>  {dispatch(getBots(data))},
  listFriends: data => {dispatch(getFriends(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(FriendGroupScreen)

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
