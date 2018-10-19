export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIMULATE_SIGN_IN = 'SIMULATE_SIGN_IN';
export const LOGIN_WITHFB = 'LOGIN_WITHFB';
export const LOGIN_WITH_PREV_FB = 'LOGIN_WITH_PREV_FB';
export const LOGIN_WITH_PREV_FB_SUCCESS = 'LOGIN_WITH_PREV_FB_SUCCESS';
export const LOGIN_WITHFB_FAILURE = 'LOGIN_WITHFB_FAILURE';
export const LOGIN_WITHFB_SUCCESS = 'LOGIN_WITHFB_SUCCESS';
export const LOGIN_WITHFB_DATA = 'LOGIN_WITHFB_DATA';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const initState = {
  error: '',
  isAppReady: false, // Has the app completed the login animation?
  isLoading: false,
  isPrevFBLoading:false,
  isLoggedIn: false,
  userData:{},
  userFBData:{},
  FBuser:{},
  signInError: false,
  signUpError: false,

  signInErrorMessage: '',
  signUpErrorMessage: ''
};

export default(state = initState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        isLoading:true
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoading:false
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading:false,
        isLoggedIn:false,
        isAppReady:false
      }
    case LOGIN_WITHFB:
      return {
        ...state,
        isLoading:true
      }
    case LOGIN_WITH_PREV_FB:
      return {
        ...state,
        isPrevFBLoading:true
      }
    case LOGIN_WITH_PREV_FB_SUCCESS:
      return {
        ...state,
        isPrevFBLoading:false,
        FBuser:action.FBuser,
        isLoggedIn:true,
        isAppReady:true
      }
    case LOGIN_WITHFB_FAILURE:
      return {
        ...state,
        isLoading:false,
        isLoggedIn:false
      }
    case LOGIN_WITHFB_SUCCESS:
      return {
        ...state,
        isLoading:false,
        userFBData:action.userFBData,
        isLoggedIn:true,
        isAppReady:true
      }
    case LOGIN_WITHFB_DATA:
      return {
        ...state,
        isLoading:false,
        FBuser:action.FBuser,
        isLoggedIn:true,
        isAppReady:true
      }
    case SIMULATE_SIGN_IN:
      return {
        ...state,
        isLoading:true
      }
    case SIGN_IN:
      return {
        ...state,
        isLoading:true
      }
    case SIGN_UP:
      return {
        ...state,
        isLoading:true
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        isAppReady:true,
        userData: action.userData
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading:false,
        isLoggedIn: true,
        isAppReady:true,
        userData: action.userData
      }
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading:false,
        isLoggedIn: false,
        signInError:true,
        signInErrorMessage: action.error.message
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading:false,
        signUpError:true,
        signUpErrorMessage: action.error.message
      }
    case 'CLEAR_ERROR': {
      return initState;
    }
    default: {
      return state;
    }
  }
};
