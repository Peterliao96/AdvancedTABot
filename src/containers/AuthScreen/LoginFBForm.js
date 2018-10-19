import React, { Component } from 'react';
var PropTypes = require('prop-types');
import {connect} from 'react-redux';
const APPID = require('../../config/FB_APPID_config')
import { LoginWithFB,LoginWithPrevFB } from '../../actions/auth';
import { StyleSheet, Alert,ImageBackground,TouchableOpacity ,ActivityIndicator} from 'react-native'
import { Text, View } from 'react-native-animatable'
import CustomButton from '../../components/CustomButton'
import metrics from '../../config/metrics'
const firebase = require('firebase');

class LoginFBForm extends Component{

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    // isLoggedIn: PropTypes.bool.isRequired,
    // onLoginPress: PropTypes.func.isRequired,
    onSignupLinkPress: PropTypes.func.isRequired,
    goToLogin:PropTypes.func.isRequired
  }

  async loginWithPrevFacebook(){
    const data = {
      UserId: firebase.auth().currentUser.providerData[0].uid,
      fullName: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      avatar: firebase.auth().currentUser.photoURL
    }
    this.props.loginWithFB(data)
  }

  async loginWithFacebook() {

    //ENTER YOUR APP ID
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APPID, { permissions: ['public_profile','email','user_friends','user_gender','groups_access_member_info'] })

    if (type == 'success') {
      this.props.onLoginWithFB(token)
    }
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }


  render(){
    const {auth:{isLoggedIn,isAppReady,isLoading,isPrevFBLoading}} = this.props
    const { onSignupLinkPress, onSignIn,onResetPWPress,onLoginWithFB,goToLogin,loginWithFB } = this.props

    return(
      <View style={styles.footer}>
      <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
      <View style={{flexDirection:'row',alignSelf:'center'}}>
        {firebase.auth().currentUser ? <TouchableOpacity onPress={this.loginWithPrevFacebook.bind(this)}>
          <ImageBackground style={styles.avatar}  source={{uri:firebase.auth().currentUser ? firebase.auth().currentUser.photoURL+'?width=9999' :''}} >
            <ActivityIndicator size="large" color="#0000ff" animating={isPrevFBLoading}/>
          </ImageBackground>
        </TouchableOpacity> : <View></View>}
        <TouchableOpacity onPress={this.loginWithFacebook.bind(this)}>
          <ImageBackground style={styles.avatar} source={require('../../images/FBavatar.jpg')} >
            <ActivityIndicator size="large" color="#0000ff" animating={isLoading}/>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      </View>
      <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={600}>
      <CustomButton
        text={'Sign In'}
        onPress={this.props.goToLogin}
        buttonStyle={styles.signInButton}
        textStyle={styles.signInButtonText}
      />
      </View>
      <Text
        ref={(ref) => this.linkRef = ref}
        style={styles.signupLink}
        onPress={onSignupLinkPress}
        animation={'fadeIn'}
        duration={600}
        delay={400}
      >
        {'Not registered yet?'}
      </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = (dispatch) => ({
  onLoginWithFB: data => {dispatch(LoginWithFB(data))},
  loginWithFB: data => {dispatch(LoginWithPrevFB(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginFBForm)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  footer: {
    height: 250,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: '#9B9FA4'
  },
  createAccountButtonText: {
    color: 'white'
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#9B9FA4'
  },
  separatorOr: {
    color: '#9B9FA4',
    marginHorizontal: 8
  },
  signInButton: {
    backgroundColor: 'white',
    margin:20
  },
  signInFacebookButton: {
    backgroundColor: '#3B5998',
  },
  signInButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signInFacebookButtonText: {
    color: 'white'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf:'center'
  },
  avatar:{
    width:100,
    height:100,
    marginHorizontal:20
  }
})
