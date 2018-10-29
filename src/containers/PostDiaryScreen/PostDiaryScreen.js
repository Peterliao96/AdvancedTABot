import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
const ApiKey = require('../../config/Google_Api_config');
import CameraRollPicker from 'react-native-camera-roll-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import {FaceDetector,MapView,Permissions,ImagePicker,Location} from 'expo';
import ActionSheet from 'react-native-actionsheet';
var PropTypes = require('prop-types');
import {connect} from 'react-redux'
import {showImage} from '../../actions/showImage'
import {postDiary} from '../../actions/postDiary';
import {setModalVisible,setModalUnVisble,setZoomViewModalVisible} from '../../actions/setModalVisible'
import {getMyProfile} from '../../actions/loadMyProfile';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import {Avatar,List, ListItem} from 'react-native-elements'
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle} from 'react-native-material-ui';
import CustomButton from '../../components/CustomButton'
import TextInput from '../../components/TextInput'
import {Toast} from 'native-base'
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
        seeStatus:this.props.diary.seeStatus,
        images:this.props.diary.images,
        location:this.props.diary.locations.length === 0 ? null : this.props.diary.locations[this.props.diary.chosenLocation].name
      }
      this.props.post(data)
      this.props.navigation.goBack()
      Toast.show({
            text: "Wrong password!",
            buttonText: "Okay",
            duration: 3000
          })
    } else if (!this.isEmpty(this.props.auth.FBuser)){
      const data = {
        UserId: this.props.auth.FBuser.UserId,
        text:this.state.content,
        seeStatus:this.props.diary.seeStatus,
        images:this.props.diary.images,
        location:this.props.diary.locations.length === 0 ? null : this.props.diary.locations[this.props.diary.chosenLocation].name
      }
      this.props.post(data)
      this.props.navigation.goBack()
      Toast.show({
            text: "Wrong password!",
            buttonText: "Okay",
            duration: 3000
          })
    } else {
      AsyncStorage.getItem('UserInfo').then(UserInfo => {
        if(UserInfo){
          var UserInfo = JSON.parse(UserInfo);
          const data = {
            UserId: UserInfo.user.myId,
            text:this.state.content,
            seeStatus:this.props.diary.seeStatus,
            images:this.props.diary.images,
            location:this.props.diary.locations.length === 0 ? null : this.props.diary.locations[this.props.diary.chosenLocation].name
          }
          this.props.post(data)
          this.props.navigation.goBack()
          Toast.show({
                text: "Wrong password!",
                buttonText: "Okay",
                duration: 3000
              })
        }
      })
    }
  }

  showActionSheet = () => {
  this.ActionSheet.show()
  }

  detectFaces = async (imageUri) => {
    const options = { mode: FaceDetector.Constants.Mode.fast };
    return await FaceDetector.detectFacesAsync(imageUri, options);
  };

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
          this.detectFaces(result.uri)
          this.props.OnShowImage(result.uri)
        }
      }
    } else if(index === 1){
      const permissions = Permissions.CAMERA_ROLL;
      const { status } = await Permissions.askAsync(permissions);

      if(status === 'granted'){
        this.props.onSetModalVisible(true)
        /*let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes:'Images'
        })
        .catch(err => {
          console.log(permissions,{err})
        })
        if(!result.cancelled){
          this.props.OnShowImage(result.uri)
        }*/

      }

    }
  }

  setImages(images) {
    this._images = images;
  }

  getImages() {
    return this._images;
  }

  selectImages(images) {
    this.setImages(images);
  }

  renderNavBar() {
    return (
      <NavBar style={{
        statusBar: {
          backgroundColor: '#FFF',
        },
        navBar: {
          backgroundColor: '#FFF',
        },
      }}>
        <NavButton onPress={() => {
          this.props.onSetModalUnVisible(false);
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'Cancel'}
          </NavButtonText>
        </NavButton>
        <NavTitle style={{
          color: '#000',
        }}>
          {'Camera Roll'}
        </NavTitle>
        <NavButton onPress={() => {
          this.props.onSetModalUnVisible(false);

          const images = this.getImages().map((image) => {
            return {
              image: image.uri,
            };
          });
          this.props.OnShowImage(images);
          this.props.setZoomViewModal(false)
          this.setImages([]);
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'Choose'}
          </NavButtonText>
        </NavButton>
      </NavBar>
    );
  }


  async switchPages(id,avatar){
    if (id === '2'){
      this.props.navigation.push('SeeStatusScreen',{id:id,avatar:avatar})
    } else if (id === '1'){
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          locationResult: 'Permission to access location was denied',
          location,
        });
      }
      Location.setApiKey(ApiKey)
      let location = await Location.getCurrentPositionAsync({});
      this.props.navigation.push('NearbyLocationScreen',{id:id,location:location,avatar:avatar})
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
    const {diary:{images,modalVisible,zoomViewModalVisible}} = this.props
    const imagesUrls = this.props.diary.images.map(item => {
      insertObject = {}
      insertObject.url = item.image
      insertObject.freeHeight = true
      return insertObject
    })
    const { onLogoutPress,logout ,getProfile,navigation,OnShowImage,setZoomViewModal} = this.props
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
        <View style={{flexDirection: 'column'}}>
          <View style={{backgroundColor:'white',height:120,flexDirection:'row'}}>
            {images.length === 0? null:
              images.map((data) =>{
                if(images.indexOf(data) <= 2){
                  return(
                  <View>
                  <TouchableOpacity onPress={() => this.props.setZoomViewModal(true)}>
                    <Image style={{width:100,height:100,margin:20}} source={{uri:data.image}}/>
                  </TouchableOpacity>
                  <Modal
                visible={zoomViewModalVisible}
                transparent={true}
                onRequestClose={() => this.props.setZoomViewModal(false)}
              >
                <ImageViewer
                  imageUrls={imagesUrls}
                  onClick={(onCancel) => {onCancel()}}
                  index={images.indexOf(data)}
                  onSwipeDown={() => {
                    console.log('onSwipeDown');
                  }}
                  enableSwipeDown={true}
                />
              </Modal>
              </View>
                  )
                }
              })}
              <TouchableOpacity style={{width:100,height:100}} onPress={this.showActionSheet}>
                <Image style={{width:100,height:100,margin:20,borderWidth:1,borderColor:'#c4cbce'}} source={require('../../images/plus2.png')}/>
                <ActionSheet
                  ref={o => this.ActionSheet = o}
                  title={'Which one do you want to choose ?'}
                  options={['Take photos', 'Choose images from libraries','Cancel']}
                  cancelButtonIndex={2}
                  destructiveButtonIndex={2}
                  onPress={(index) => { this.onChooseImagePress(index) }}
                />
                <Modal
                  animationType={'slide'}
                  transparent={false}
                  visible={modalVisible}
                  onRequestClose={() => {
                    this.prop.onSetModalUnVisible(false);
                  }}
                >
                  {this.renderNavBar()}
                  <CameraRollPicker
                    maximum={10}
                    imagesPerRow={4}
                    callback={this.selectImages.bind(this)}
                    selected={[]}
                  />
                </Modal>
              </TouchableOpacity>
          </View>
          <View style={{backgroundColor:'white',height:120,flexDirection:'row'}}>
            {images.length >= 3?
              <View style={{flexDirection:'row'}}>
              {images.length === 3? null: images.map((data) =>{
                if(images.indexOf(data) >= 3 && images.indexOf(data) <= 5){
                  return(
                    <View>
                    <TouchableOpacity onPress={() => this.props.setZoomViewModal(true)}>
                    <Image style={{width:100,height:100,margin:20}} source={{uri:data.image}}/>
                    </TouchableOpacity>
                    <Modal
                  visible={zoomViewModalVisible}
                  transparent={true}
                  onRequestClose={() => this.props.setZoomViewModal(false)}
                >
                  <ImageViewer
                    imageUrls={imagesUrls}
                    onClick={(onCancel) => {onCancel()}}
                    index={images.indexOf(data)}
                    onSwipeDown={() => {
                      console.log('onSwipeDown');
                    }}
                    enableSwipeDown={true}
                  />
                </Modal>
                </View>
                  )
                }
              })}
              <TouchableOpacity style={{width:100,height:100}} onPress={this.showActionSheet}>
              <Image style={{width:100,height:100,margin:20,borderWidth:1,borderColor:'#c4cbce'}} source={require('../../images/plus2.png')}/>
              <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'Which one do you want to choose ?'}
                options={['Take photos', 'Choose images from libraries','Cancel']}
                cancelButtonIndex={2}
                destructiveButtonIndex={2}
                onPress={(index) => { this.onChooseImagePress(index) }}
              />
              <Modal
                animationType={'slide'}
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                  this.props.onSetModalUnVisible(false);
                }}
              >
                {this.renderNavBar()}
                <CameraRollPicker
                  maximum={10}
                  imagesPerRow={4}
                  callback={this.selectImages.bind(this)}
                  selected={[]}
                />
              </Modal>
            </TouchableOpacity></View>:null}
          </View>
          <View style={{backgroundColor:'white',height:120,flexDirection:'row'}}>
            {images.length >= 6?
              <View style={{flexDirection:'row'}}>
              {images.length === 6? null: images.map((data) =>{
                if(images.indexOf(data) >= 6 && images.indexOf(data) <= 8){
                  return(
                    <View>
                    <TouchableOpacity onPress={() => this.props.setZoomViewModal(true)}>
                    <Image style={{width:100,height:100,margin:20}} source={{uri:data.image}}/>
                    </TouchableOpacity>
                    <Modal
                  visible={zoomViewModalVisible}
                  transparent={true}
                  onRequestClose={() => this.props.setZoomViewModal(false)}
                >
                  <ImageViewer
                    imageUrls={imagesUrls}
                    onClick={(onCancel) => {onCancel()}}
                    index={images.indexOf(data)}
                    onSwipeDown={() => {
                      console.log('onSwipeDown');
                    }}
                    enableSwipeDown={true}
                  />
                </Modal>
                </View>
                  )
                }
              })}
              <TouchableOpacity style={{width:100,height:100}} onPress={this.showActionSheet}>
              <Image style={{width:100,height:100,margin:20,borderWidth:1,borderColor:'#c4cbce'}} source={require('../../images/plus2.png')}/>
              <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'Which one do you want to choose ?'}
                options={['Take photos', 'Choose images from libraries','Cancel']}
                cancelButtonIndex={2}
                destructiveButtonIndex={2}
                onPress={(index) => { this.onChooseImagePress(index) }}
              />
              <Modal
                animationType={'slide'}
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                  this.props.onSetModalUnVisible(false);
                }}
              >
                {this.renderNavBar()}
                <CameraRollPicker
                  maximum={10}
                  imagesPerRow={4}
                  callback={this.selectImages.bind(this)}
                  selected={[]}
                />
              </Modal>
            </TouchableOpacity></View>:null}
          </View>
        </View>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
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
  diary:state.diary,
  status:state.status
})

const mapDispatchToProps = (dispatch) => ({
  getProfile: data => {dispatch(getMyProfile(data))},
  onLogoutPress: () => {dispatch(onLogout())},
  post: data => {dispatch(postDiary(data))},
  OnShowImage:uri => {dispatch(showImage(uri))},
  onSetModalVisible:data => {dispatch(setModalVisible(data))},
  onSetModalUnVisible: data => {dispatch(setModalUnVisble(data))},
  setZoomViewModal: data => {dispatch(setZoomViewModalVisible(data))}
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
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});
