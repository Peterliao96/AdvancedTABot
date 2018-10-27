import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native';
var PropTypes = require('prop-types');
import {connect} from 'react-redux'
import {postDiary} from '../../actions/postDiary';
import {getMyProfile} from '../../actions/loadMyProfile';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import {Avatar,List, ListItem} from 'react-native-elements'
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle} from 'react-native-material-ui';
import CustomButton from '../../components/CustomButton'
import TextInput from '../../components/TextInput'
import AddSpinnerLoader from '../../components/AddSpinnerLoader';
import Locale from '../../Locale';

class PostDiaryScreen extends Component{
  static propTypes = {
    logout: PropTypes.func
  }

  state = {
    content:""
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle:'Diary posting',
      headerTintColor: 'white',
      headerStyle:{
        backgroundColor:COLOR.blue500
      },
      headerTitleStyle:{
        color:'#FFF'
      },
      headerRight:(
        <View style={{flexDirection:'row'}}>
          <Avatar  size="small" rounded source={{uri:navigation.getParam('avatar')}}/>
        </View>
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
      this.props.navigation.setParams({
        avatar:this.props.auth.FBuser.avatar
      })
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId
      }
      this.props.getProfile(data)
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
          this.props.navigation.setParams({
            avatar:this.props.auth.FBuser.avatar
          })
        }
      })
    }
  }

  async onPost(){
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        UserId: this.props.auth.userFBData.user.providerData[0].uid,
        text:this.state.content,
        images:this.props.diary.images
      }
      this.props.post(data)
      this.props.navigation.goBack()
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId,
        text:this.state.content,
        images:this.props.diary.images
      }
      this.props.post(data)
      this.props.navigation.goBack()
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo);
          const data = {
            UserId: UserInfo.user.myId,
            text:this.state.content,
            images:this.props.diary.images
          }
          this.props.post(data)
          this.props.navigation.goBack()
        }
      })
    }
  }

  async switchPages(id,avatar){
    if (id === '2'){
      this.props.navigation.push('SeeStatusScreen',{id:id,avatar:avatar})
    }
  }

  render() {
    const data = [{
      id:"1",
      title:"Location",
      icon:'map'
    },{
      id:"2",
      title:"Who can see",
      icon:"person"
    }]
    const {auth: {userFBData,FBuser,isLoading,isAppReady}} = this.props
    const { user: {profile}} = this.props
    const {diary:{images}} = this.props
    const { onLogoutPress,logout ,getProfile,navigation} = this.props
    const avatar = navigation.getParam('avatar')
      return (
        <View style={styles.flex}>
        <TextInput ref="content"
          placeholder={i18n.t('placeholder')}
          keyboardType="default"
          multiline={true}
          autoFocus={true}
          style={styles.input}
          enablesReturnKeyAutomatically={true}
          returnKeyType='done'
          onChange={(event) => this.state.content = event.nativeEvent.text }
        />
        <View style={{backgroundColor:'white',height:350}}>
          <TouchableOpacity style={{width:100,height:100}}>
            <Image style={{width:100,height:100,margin:20,borderWidth:1,borderColor:'#c4cbce'}} source={require('../../images/plus2.png')}/>
          </TouchableOpacity>
        </View>
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
              onPress={this.switchPages.bind(this,item.id,avatar)}
            />
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item,index) => item.id}
      />
    </List>
          <CustomButton style={styles.button} text={i18n.t('submit')} textStyle={styles.buttonText} onPress={this.onPost.bind(this)}/>

        <View style={{height: this.state.keyboardSpace}}></View>
      </View>
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
  post: data => {dispatch(postDiary(data))}
})

var i18n = Locale.key('CreatePost', {
  placeholder: 'What do you have to say for yourself?',
  submit: 'Submit',
});

export default connect(mapStateToProps,mapDispatchToProps)(PostDiaryScreen)

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
  },
  avatar:{
    marginRight:20,
    borderRadius:10,
    width:20,
    height:20
  },
  flex: {
    flex: 1
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'white',
    padding: 20,
    textAlignVertical: 'top'
  },
  footer: {
    padding: 10,
    flexDirection: 'row'
  }
});
