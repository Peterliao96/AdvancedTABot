import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
var PropTypes = require('prop-types');
import {connect} from 'react-redux';
import AddBotHeader from '../../components/AddBotHeader';
import { TextField } from 'react-native-material-textfield';
import {editBot} from '../../actions/editBot';
import CustomButton from '../../components/CustomButton'
import type { Error, Bot } from '../../types/types';


type State = {
  fullName: string,
  description: string,
  fullNameError: string,
  UserId: string
};

class editBotScreen extends Component<State>{

  state = {
    fullName:this.props.navigation.getParam('fullName'),
    description: this.props.navigation.getParam('description'),
    fullNameError:''
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

  async onEditBot(UserId){
    if(!this.isEmpty(this.props.auth.userFBData)){
      const data = {
        BotId: UserId,
        UserId: this.props.auth.userFBData.user.providerData[0].uid,
        avatar:this.props.images.BotAvatar,
        description: this.state.description,
        fullName: this.state.fullName
      }
      this.props.onEditBotPress(data)
      this.props.navigation.goBack()
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        BotId: UserId,
        UserId: this.props.auth.FBuser.UserId,
        avatar:this.props.images.BotAvatar,
        description: this.state.description,
        fullName: this.state.fullName
      }
      this.props.onEditBotPress(data)
      this.props.navigation.goBack()
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo)
          const data = {
            BotId: UserId,
            UserId: UserInfo.user.myId,
            avatar:this.props.images.BotAvatar,
            description: this.state.description,
            fullName: this.state.fullName
          }
          this.props.onEditBotPress(data)
          this.props.navigation.goBack()
        }
      })
    }

  }

  render() {
    const {bot:{isEditing,BotData}} = this.props
    const {auth: {FBuser,userFBData}} = this.props
    const {images:{BotAvatar}} = this.props
    const {navigation} = this.props;
    const id = navigation.getParam('id');
    const UserId = navigation.getParam('UserId')
    const avatar = navigation.getParam('avatar')

    if(id === '2'){
      return (
        <View style={{flex:1}}>
        <AddBotHeader name="Upload Bot's image here" avatar={BotAvatar}/>
        <TextField
          label='FullName of bot'
          autoCapitalize='none'
          onChangeText={fullName => this.setState({fullName})}
          inputContainerStyle={{
            width: 350,
            paddingHorizontal: 16,
            borderBottomWidth:1,
            marginHorizontal:10
          }}
          />
          <TextField
            label='Description'
            autoCapitalize='none'
            onChangeText={description => this.setState({description})}
            inputContainerStyle={{
              width: 350,
              paddingHorizontal: 16,
              borderBottomWidth:1,
              marginHorizontal:10
            }}
            />
          <CustomButton
            text={'Save the bot'}
            onPress={this.onEditBot.bind(this,UserId)}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
          <CustomButton
            text={'Cancel'}
            onPress={() => this.props.navigation.goBack()}
            buttonStyle={styles.cancelButton}
            textStyle={styles.buttonText}
          />
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  auth:state.auth,
  bot:state.bot,
  images:state.images
})

const mapDispatchToProps = (dispatch) => ({
  onEditBotPress: data =>  dispatch(editBot(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(editBotScreen)

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
  cancelButton: {
    backgroundColor: '#1976D2',
    marginHorizontal: 20,
    marginBottom:20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
