import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import AddBotHeader from '../../components/AddBotHeader';
var PropTypes = require('prop-types');
import {connect} from 'react-redux';
import {createBot} from '../../actions/createBot';
import { TextField } from 'react-native-material-textfield';
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
import CustomButton from '../../components/CustomButton'
import type { Error, Bot } from '../../types/types';

type Props = {
  onSubmitbot: ({ fullName: string, description:string, UserId: string }) => Bot,
  onClearError: () => void,
  error: Error,
};

type State = {
  fullName: string,
  description: string,
  fullNameError: string,
  UserId: string
};

class CreateBotScreen extends Component<void, Props, State>{

  state = {
    fullName:'',
    description: '',
    fullNameError:''
  }
  static propTypes = {
    logout: PropTypes.func,
    isLoading:PropTypes.bool
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


  async _submitBot(){
    try{
      if(!this.isEmpty(this.props.auth.userFBData)){
        const BotData = {
          fullName:this.state.fullName,
          description: this.state.description,
          avatar: this.props.images.BotAvatar,
          UserId: this.props.auth.userFBData.user.providerData[0].uid
        }
        this.props.onSubmitbot(BotData)
        this.props.navigation.navigate('FriendGroupScreen')
      } else if (!this.isEmpty(this.props.auth.FBuser)) {
        const BotData = {
          fullName:this.state.fullName,
          description: this.state.description,
          avatar: this.props.images.BotAvatar,
          UserId: this.props.auth.FBuser.UserId
        }
      } else {
        var UserInfo = await AsyncStorage.getItem('UserInfo');
        UserInfo = JSON.parse(UserInfo);
        const BotData = {
            fullName:this.state.fullName,
            description: this.state.description,
            avatar: this.props.images.BotAvatar,
            UserId: UserInfo.user.myId
        }
        this.props.onSubmitbot(BotData)
        this.props.navigation.navigate('FriendGroupScreen')
      }
    } catch(err){
      console.log(err)
    }
  }

  render() {

    const {auth:{userFBData,FBuser}} = this.props
    const {bot:{isLoading}} = this.props
    const {images:{BotAvatar}} = this.props
    const { onSubmitbot } = this.props
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
          text={'Submit this bot'}
          isLoading={isLoading}
          onPress={this._submitBot.bind(this)}
          buttonStyle={styles.submitButton}
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

const mapStateToProps = (state) =>({
  bot: state.bot,
  auth: state.auth,
  images: state.images
})

const mapDispatchToProps = (dispatch) => ({
  onSubmitbot:BotData => dispatch(createBot(BotData))
})

export default connect(mapStateToProps,mapDispatchToProps)(CreateBotScreen)

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
  submitButton: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  cancelButton: {
    backgroundColor: '#1976D2',
    marginHorizontal: 20,
    marginTop:0
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
