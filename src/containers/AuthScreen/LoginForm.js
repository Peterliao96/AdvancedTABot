import React, { Component } from 'react';
var PropTypes = require('prop-types');
import {connect} from 'react-redux';
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'
import { signIn } from '../../actions/auth';
import { validateEmail, isEmpty } from '../../helpers/validation';
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'
import type { Error, User } from '../../types/types';

type Props = {
  ValidationProps: ValidationProps,
  onSignIn: ({ email: string, password: string }) => User,
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
  email: string,
  password: string,
  emailError: string,
  passwordError: string,
};

class LoginForm extends Component<void,Props,State> {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    // isLoggedIn: PropTypes.bool.isRequired,
    // onLoginPress: PropTypes.func.isRequired,
    onSignupLinkPress: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    focusInput: false,
  };

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
      errorMessage: 'This field cannot be empty',
      validateFunction: isEmpty,
      data: this.state.password,
    });
    return isValidEmail && isValidPassword;
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

  _signIn = () => {
    const signInData = {
      email: this.state.email,
      password: this.state.password,
    };
    if (this._validateData()) {
      this.props.onSignIn(signInData);
    }
  };

  componentWillUnmount() {
    this.props.onClearError();
  }


  render () {
    const { auth: {isLoading ,signInError, signInErrorMessage, isLoggedIn} } = this.props
    const { onSignupLinkPress, onSignIn } = this.props
    const isValid = this.state.email !== '' && this.state.password !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <CustomTextInput
            name={'email'}
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            name={'password'}
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={this._signIn}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
              text={'Log In'}
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
      </View>
    )
  }
}

export default connect(
  state => ({ auth: state.auth }),
  dispatch => ({
    onSignIn: data => {
      dispatch(signIn(data));
    },
    onClearError: () => {
      dispatch({ type: 'CLEAR_ERROR' });
    },
  }),
)(LoginForm);

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
  loginButton: {
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
