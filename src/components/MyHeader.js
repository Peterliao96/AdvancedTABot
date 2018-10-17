import React, {Component} from 'react';
var PropTypes = require('prop-types');
const firebase = require('firebase')
import {connect} from 'react-redux';
import {uploadMyAvatar,showMyAvatar} from '../actions/uploadImages';
import {MapView,Permissions,ImagePicker} from 'expo';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';


class MyHeader extends Component{

  showActionSheet = () => {
  this.ActionSheet.show()
  }

  onChooseImagePress = async (index) => {
    if(index === 0){
      const permissions = Permissions.CAMERA_ROLL;
      const { status } = await Permissions.askAsync(permissions);

      if(status === 'granted'){
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes:'Images'
        })
        .catch(err => {
          console.log(permissions,{err})
        })
        if(!result.cancelled){
          console.log(result.uri)
          this.uploadImage(result.uri,new Date().toISOString().substring(0, 10))
          .then(() => {
            Alert.alert('success');
            this.setState({
              image_uri: result.uri
            })
          })
        }
      }
    } else if(index === 1){
      const permissions = Permissions.CAMERA_ROLL;
      const { status } = await Permissions.askAsync(permissions);

      if(status === 'granted'){
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes:'Images'
        })
        .catch(err => {
          console.log(permissions,{err})
        })
        if(!result.cancelled){
          console.log(result.uri)
          this.uploadImage(result.uri,new Date().toISOString().substring(0, 10))
          .then(() => {
            Alert.alert('success');
            this.setState({
              image_uri: result.uri
            })
          })
        }

      }

    }
  }

  uploadImage = async (uri,imageName) => {
    this.props.showMe(uri);
    AsyncStorage.getItem('UserInfo').then(UserInfo => {
      if(!UserInfo){
        AsyncStorage.getItem('userFBData').then(userFBData => {
          var userFBData = JSON.parse(userFBData);
          const data = {
            UserId: userFBData.user.providerData[0].uid,
            avatar: uri + imageName
          }
          this.props.onUpload(data)
        })
      } else {
        var UserInfo = JSON.parse(UserInfo);
        const data = {
          UserId: UserInfo.user.myId,
          avatar: uri + imageName
        }
        this.props.onUpload(data)
      }
    })
  }

  render(){
    const {images :{isUploading, MyAvatar}} = this.props
    const { name, description, onUpload, showMe} = this.props;
    return(
      <ImageBackground style={styles.headerBackground} source={require('../images/drawerImage.png')}>
        <View style={styles.header}>
        <TouchableOpacity onPress={this.showActionSheet}>
          <View style={styles.profilepicWrap}>
            <Image style={styles.profiepic} source={{uri:MyAvatar}}/>
            <ActionSheet
              ref={o => this.ActionSheet = o}
              title={'Which one do you want to choose ?'}
              options={['Take photos', 'Choose images from libraries','Cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={(index) => { this.onChooseImagePress(index) }}
            />
          </View>
          </TouchableOpacity>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.pos}>{description}</Text>
        </View>
      </ImageBackground>
    )
  }
}
const mapStateToProps = (state) => ({
  images:state.images
})

const mapDispatchToProps = (dispatch) => ({
  onUpload: data =>  {dispatch(uploadMyAvatar(data))},
  showMe: uri => {dispatch(showMyAvatar(uri))}
})

export default connect(mapStateToProps,mapDispatchToProps)(MyHeader)


const styles = StyleSheet.create({
  headerBackground:{
    flex:1,
    width: null,
    alignSelf: 'stretch'
  },
  header : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  profilepicWrap:{
    width: 120,
    height: 120,
    borderRadius:60,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius:16
  },
  profiepic:{
    flex:1,
    width:null,
    alignSelf:'stretch',
    borderRadius:60,
    borderColor:'#FFF',
    borderWidth:4
  },
  name:{
    marginTop:20,
    fontSize:16,
    color:'#FFF',
    fontWeight:'bold'
  },
  pos:{
    fontSize:14,
    color:'#0394c0',
    fontWeight:'300',
    fontStyle:'italic'
  }
})
