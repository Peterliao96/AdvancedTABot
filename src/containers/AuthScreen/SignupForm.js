import React, { Component } from 'react';
var PropTypes = require('prop-types');
import {connect} from 'react-redux';
import { StyleSheet, Alert } from 'react-native'
import { Text, View } from 'react-native-animatable'
const firebase = require('firebase');
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'
import { onSignupPress } from '../../actions/auth';
import { validateEmail,validatePassword, validateFullName } from '../../helpers/validation';
import type, { Error, User } from '../../types/types';

type Props = {
  ValidationProps: ValidationProps,
  onSignup: ({ fullName: string, email: string, password: string }) => User,
  onClearError: () => void,
  error: Error,
};

type ValidationProps = {
  errorType: string,
  errorMessage: string,
  validateFunction: Function,
  data: string,
};

type State = {
  fullName: string,
  email: string,
  password: string,
  emailError: string,
  passwordError: string,
  fullNameError: string,
};

class SignupForm extends Component<void, Props, State> {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onLoginLinkPress: PropTypes.func.isRequired
  }

  state = {
    fullName: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    fullNameError: '',
  };


  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }

  _validation = ({
    errorType,
    errorMessage,
    validateFunction,
    data,
  }: ValidationProps) => {
    if (validateFunction(data)) {
      this.setState({
        [errorType]: '',
      });
      return true;
    }
    this.setState({
      [errorType]: errorMessage,
    });
    return false;
  };

  _validateData = () => {
    const isValidEmail = this._validation({
      errorType: 'emailError',
      errorMessage: 'Wrong type of email',
      validateFunction: validateEmail,
      data: this.state.email,
    });
    const isValidPassword = this._validation({
      errorType: 'passwordError',
      errorMessage:
        'Password has to contain min 8 characters, at least one uppercase and one number',
      validateFunction: validatePassword,
      data: this.state.password,
    });
    const isValidFullName = this._validation({
      errorType: 'fullNameError',
      errorMessage: 'Invalid full name',
      validateFunction: validateFullName,
      data: this.state.fullName,
    });
    return isValidEmail && isValidPassword && isValidFullName;
  };

  _onSignupPress(){
    const signUpData = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password
    }
    console.log('what')
    if (this._validateData()) {
      this.props.onSignup(signUpData);
    }
  }


  render () {
    const { isLoading, onLoginLinkPress } = this.props
    const isValid = this.state.email !== '' && this.state.password !== '' && this.state.fullName !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => this.formRef = ref}>
          <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Full name'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.emailInputRef.focus()}
            onChangeText={fullName => this.setState({ fullName })}
            value={this.state.fullName}
            error={this.state.fullNameError}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={email => this.setState({ email })}
            value={this.state.email.toLowerCase()}
            error={this.state.emailError}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            error={this.state.passwordError}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={this._onSignupPress.bind(this)}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={'Create Account'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.loginLink}
            onPress={onLoginLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Already have an account?'}
          </Text>
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({error: state.error.signUpError}),
  dispatch => ({
    onSignup: (data) => {
      return dispatch(onSignupPress(data));
    },
    onClearError: () => {
      return dispatch({ type: 'CLEAR_ERROR' });
    }
  })
)(SignupForm)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: 'white'
  },
  createAccountButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  loginLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
