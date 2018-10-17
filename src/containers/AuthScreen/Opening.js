import React, { Component } from 'react';
var PropTypes = require('prop-types');
const APPID = require('../../config/FB_APPID_config')
import { StyleSheet,TouchableOpacity, AsyncStorage } from 'react-native'
import { Text, View } from 'react-native-animatable'
import {connect} from 'react-redux';
import {LoginWithFB} from '../../actions/auth';
import {Permissions, Notifications} from 'expo';
import CustomButton from '../../components/CustomButton'
import metrics from '../../config/metrics'





class Opening extends Component {
  static propTypes = {
    onCreateAccountPress: PropTypes.func.isRequired,
    onSignInPress: PropTypes.func.isRequired,
  }

  async loginWithFacebook() {

    //ENTER YOUR APP ID
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APPID, { permissions: ['public_profile','email','user_friends','user_gender','groups_access_member_info'] })

    if (type == 'success') {
      this.props.onLoginWithFB(token)
    }
  }





  render () {
    const {auth: {isLoading,isLoggedIn}} = this.props;
    const { onLoginWithFB }  = this.props;
    return (
      <View style={styles.container}>
        <View animation={'zoomIn'} delay={600} duration={400}>
          <CustomButton
            text={'Create Account'}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{'Or'}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View animation={'zoomIn'} delay={800} duration={400}>
          <CustomButton
            text={'Sign In'}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
        <View animation={'zoomIn'} delay={1000} duration={400} style={{marginTop:30}}>
          <CustomButton
            text={'Sign In with Facebook'}
            onPress={this.loginWithFacebook.bind(this)}
            buttonStyle={styles.signInFacebookButton}
            textStyle={styles.signInFacebookButtonText}
            isLoading={isLoading}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  onLoginWithFB: data => dispatch(LoginWithFB(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Opening)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: metrics.DEVICE_WIDTH * 0.1,
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
    backgroundColor: '#1976D2'
  },
  signInFacebookButton: {
    backgroundColor: '#3B5998',
  },
  signInButtonText: {
    color: 'white'
  },
  signInFacebookButtonText: {
    color: 'white'
  }
})
