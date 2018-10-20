import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { SearchBar,List, ListItem,ButtonGroup,Button } from 'react-native-elements'
import  Icon  from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
import {getRequested} from '../../actions/getRequestedList'
import {ignoreRequest} from '../../actions/ignoreRequest'
import {checkRequest} from '../../actions/checkRequest';
import {approveRequest} from '../../actions/approveRequest';
var PropTypes = require('prop-types');
//import {Navigation} from 'react-native-navigation';
import CustomButton from '../../components/CustomButton'
//import CustomTopBar from '../../components/CustomTopBar';

class RequestScreen extends Component{

  constructor(){
    super()
    this.state ={
      selectedIndex:2
    }
  }

  updateIndex(selectedIndex){
    this.setState({selectedIndex})
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
      this.props.displayRequestedList(data);
    } else if (!this.isEmpty(this.props.auth.FBuser)) {
      const data = {
        UserId: this.props.auth.FBuser.UserId
      }
      this.props.displayRequestedList(data);
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        var UserInfo = JSON.parse(UserInfo);
        const data = {
          UserId: UserInfo.user.myId
        }
        this.props.displayRequestedList(data);
      })
    }
  }

  async _approve(RequestUserId,statusIgnore){
    if(!statusIgnore){
      if(!this.isEmpty(this.props.auth.userFBData)){
        const data = {
          UserId: this.props.auth.userFBData.user.providerData[0].uid,
          RequestUserId: RequestUserId
        }
        this.props.OnApproveRequest(data)
      } else if (!this.isEmpty(this.props.auth.FBuser)){
        const data = {
          UserId: this.props.auth.FBuser.UserId,
          RequestUserId: RequestUserId
        }
        this.props.OnApproveRequest(data)
      } else {
        AsyncStorage.getItem('UserInfo').then(UserInfo => {
          var UserInfo = JSON.parse(UserInfo);
          const data = {
            UserId: UserInfo.user.myId,
            RequestUserId: RequestUserId
          }
          this.props.OnApproveRequest(data)
        })
      }
    }
  }

  _ignore(RequestUserId,statusApproved){
    if(!statusApproved){
      if(!this.isEmpty(this.props.auth.userFBData)){
        const data = {
          UserId: this.props.auth.userFBData.user.providerData[0].uid,
          RequestUserId: RequestUserId
        }
        this.props.ignore(data)
      } else if (!this.isEmpty(this.props.auth.FBuser)){
        const data = {
          UserId: this.props.auth.FBuser.UserId,
          RequestUserId: RequestUserId
        }
        this.props.ignore(data)
      } else {
        AsyncStorage.getItem('UserInfo').then(UserInfo => {
          var UserInfo = JSON.parse(UserInfo);
          const data = {
            UserId: UserInfo.user.myId,
            RequestUserId: RequestUserId
          }
          this.props.ignore(data)
        })
      }
    }
  }

  renderItem(statusApproved,statusIgnore,UserId){
    if(statusApproved && !statusIgnore){
      return(
        <View style={{flexDirection:'row'}}>
          <Text style={{marginRight:20}}> Accept </Text>
        </View>
      )
    } else if(!statusApproved && statusIgnore){
      return(
        <View style={{flexDirection:'row'}}>
          <Text style={{marginRight:20}}> Ignore </Text>
        </View>
      )
    } else if(!statusApproved && !statusIgnore){
      return(
        <View style={{flexDirection:'row'}}>
        <Button onPress={this._approve.bind(this,UserId, statusIgnore)} title='Agree' titleStyle={{size:3,marginVertical:-3}} buttonStyle={{backgroundColor:COLOR.blue300,borderRadius:5,marginVertical:5,marginRight:-5, height:43,alignItems:'center'}}/>
        <Button onPress={this._ignore.bind(this,UserId, statusApproved)} title='Ignore' titleStyle={{fontSize:10}} buttonStyle={{backgroundColor:COLOR.blue300,borderRadius:5,marginVertical:5,height:43,alignItems:'center'}} />
          </View>
      )
    }
  }


  render() {
    const {auth:{userFBData}} = this.props
    var {request: {requestedList}} = this.props;
    const { displayRequestedList,ignore } = this.props;
    const {selectedIndex} = this.state;
    return (
      <ScrollView>
        <Text style={{marginLeft:20,marginTop:20, fontSize:18}}> Received </Text>
        <List
      containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
    >
      <FlatList
        data={requestedList}
        extraData={this.props}
        renderItem={({ item }) => {
          return (
            <ListItem
              roundAvatar
              title={item.fullName}
              rightIcon={this.renderItem(item.statusApproved,item.statusIgnore,item.UserId)}
              avatar={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
              containerStyle={{ borderBottomWidth: 0 }}
            />
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
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
  auth:state.auth
})

const mapDispatchToProps = (dispatch) => ({
  displayRequestedList: data => {dispatch(getRequested(data))},
  OnApproveRequest: data => {dispatch(approveRequest(data))},
  ignore: data => {dispatch(ignoreRequest(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(RequestScreen)
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
