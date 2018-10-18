export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIMULATE_SIGN_IN = 'SIMULATE_SIGN_IN';
export const LOGIN_WITHFB = 'LOGIN_WITHFB';
export const LOGIN_WITHFB_FAILURE = 'LOGIN_WITHFB_FAILURE';
export const LOGIN_WITHFB_SUCCESS = 'LOGIN_WITHFB_SUCCESS';
export const LOGIN_WITHFB_DATA = 'LOGIN_WITHFB_DATA';
const initState = {
  error: '',
  isLoading: false,
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
    case LOGIN_WITHFB:
      return {
        ...state,
        isLoading:true
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
        isLoggedIn:true
      }
    case LOGIN_WITHFB_DATA:
      return {
        ...state,
        isLoading:false,
        FBuser:action.FBuser,
        isLoggedIn:true
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
        userData: action.userData
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading:false,
        isLoggedIn: true,
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
