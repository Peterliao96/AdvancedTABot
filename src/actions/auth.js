import {AsyncStorage,Alert} from 'react-native';
import {NavigationActions} from 'react-navigation';
import AuthScreen from '../containers/AuthScreen';
const config = require('../config/firebase_config');
// Initialize Firebase
const firebase = require('firebase');
firebase.initializeApp(config);
import callApi from '../helpers/api';
import {
  SIMULATE_SIGN_IN_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN,
  SIGN_UP,
  SIMULATE_SIGN_IN,
  LOGIN_WITHFB,
  LOGIN_WITH_PREV_FB,
  LOGIN_WITH_PREV_FB_SUCCESS,
  LOGIN_WITHFB_FAILURE,
  LOGIN_WITHFB_SUCCESS,
  LOGIN_WITHFB_DATA,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS
} from '../reducers/auth';
function signOut(){
  return {
    type:LOGOUT
  }
}
function simulateSignInSuccess(){
  return dispatch => {
    dispatch({
      type:SIMULATE_SIGN_IN_SUCCESS
    })
  }
}

function logoutSuccess(){
  return dispatch => {
    dispatch({
      type:LOGOUT_SUCCESS
    })
  }
}
function logoutFailure(err){
  return dispatch => {
    dispatch({
      type:LOGOUT_FAILURE,
      err
    })
  }
}

export function onLogout(){
  return dispatch => {
    dispatch(signOut())
    firebase.auth().signOut().then(function() {
      dispatch(logoutSuccess())
    }).catch(function(error) {
      console.log(error)
    });
  }
}
function signUpSuccess (userData) {
  return dispatch => {
    dispatch({
      type: SIGN_UP_SUCCESS,
      userData
    })
  }
};

function signUpFailure (error) {
  return dispatch => {
    dispatch({
      type: SIGN_UP_FAILURE,
      error,
    })
  }
};

function signUp(){
  return {
    type: SIGN_UP
  }
}
function SignInWithFB(){
  return {
    type:LOGIN_WITHFB
  }
}

function loginWithPrevFBSuccess(FBuser){
  return dispatch => {
    dispatch({
      type:LOGIN_WITH_PREV_FB_SUCCESS,
      FBuser
    })
  }
}
function SignInWithPrevFB(){
  return {
    type:LOGIN_WITH_PREV_FB
  }
}

function loginWithFBFailure(err){
  return dispatch => {
    dispatch({
      type:LOGIN_WITHFB_FAILURE,
      err
    })
  }
}
function loginWithFBdata(FBuser){
  return dispatch => {
    dispatch({
      type:LOGIN_WITHFB_DATA,
      FBuser
    })
  }
}
function loginWithFBSuccess(userFBData){
  return dispatch => {
    dispatch({
      type:LOGIN_WITHFB_SUCCESS,
      userFBData
    })
  }
}
export function LoginWithPrevFB(data){
  return dispatch => {
    dispatch(SignInWithPrevFB());
    callApi('/loginWithFB',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      setTimeout(() => dispatch(loginWithPrevFBSuccess(res.FBuser)), 1000)
      console.log(res.message)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
export function LoginWithFB(token){
  return dispatch => {
    const credential = firebase.auth.FacebookAuthProvider.credential(token)
    dispatch(SignInWithFB());
    firebase.auth().signInAndRetrieveDataWithCredential(credential).then((userFBData) => {
      AsyncStorage.setItem('userFBData',JSON.stringify(userFBData)).then(() => {
        setTimeout(() => dispatch(loginWithFBSuccess(userFBData)),1000 );
        const data = {
          fullName: userFBData.user.displayName,
          email: userFBData.user.email,
          avatar: userFBData.user.photoURL,
          UserId: userFBData.user.providerData[0].uid
        }
        callApi('/loginWithFB',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(res => {
          dispatch(loginWithFBdata(res.FBuser))
          console.log(res.message)
        })
        .catch(err => {
          console.log(err)
        })
      })

    })
    .catch(err => {
      dispatch(loginWithFBFailure(err))
    })
  }
}

function logIn(){
  return dispatch => {
    dispatch({
      type: SIGN_IN
    })
  }
}
export function onSignupPress(data) {
  return (dispatch) => {
    dispatch(signUp())
    callApi('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response =>
        response.json()
      )
      .then(userData => {
        if (userData.token) {
          try {
            AsyncStorage.setItem('UserInfo', JSON.stringify(userData)).then(() => {
              setTimeout(() => dispatch(signUpSuccess(userData.user)),1000 );
              Alert.alert(userData.message)
            });
          } catch (err) {
            console.log(err);
            dispatch(signUpFailure(err))
          }
        } else {
          Alert.alert(userData.message)
          dispatch(signUpFailure(userData.message));
        }
      })
      .catch(err => {
        dispatch(signUpFailure(err));
      });
  }
};

function signInSuccess(userData) {
  return dispatch => {
    dispatch({
        type: SIGN_IN_SUCCESS,
        userData,
    })
  }
};

function signInFailure(error){
  return dispatch => {
    dispatch({
      type: SIGN_IN_FAILURE,
      error,
    })
  }
};

function simulateLogin(){
  return dispatch => {
    dispatch({
      type:SIMULATE_SIGN_IN
    })
  }
}
export function simulateLoginProcess(){
  return dispatch => {
    dispatch(simulateLogin())
    setTimeout(() => dispatch(simulateSignInSuccess()), 1000)
  }
}


export function signIn(data) {
  return (dispatch) => {
    dispatch(logIn())
    callApi('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        if (response.token) {
          try {
            AsyncStorage.setItem('UserInfo', JSON.stringify(response)).then(() => {
              dispatch(simulateLoginProcess())
              setTimeout(() => dispatch(signInSuccess(response.user)), 1200)
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          Alert.alert(response.message)
          dispatch(signInFailure(response.message));
        }
      })
      .catch(err => {
        dispatch(signInFailure(err));
      });
  }
};
