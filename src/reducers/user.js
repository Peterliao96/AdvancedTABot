export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
export const FIRST_LOAD_USER = 'FIRST_LOAD_USER';
export const GET_MY_PROFILE = 'GET_MY_PROFILE';
export const GET_MY_PROFILE_FAILURE = 'GET_MY_PROFILE_FAILURE';
export const GET_MY_PROFILE_SUCCESS = 'GET_MY_PROFILE_SUCCESS';

const initState = {
  isSearchUserLoading:false,
  isGetting:false,
  userInfo:[],
  profile:{}
};

export default (state = initState, action) => {
  switch (action.type) {
     case GET_MY_PROFILE:
      return {
        ...state,
        isGetting:true
      }
     case GET_MY_PROFILE_FAILURE:
      return {
        ...state,
        isGetting:false
      }
     case GET_MY_PROFILE_SUCCESS:
      return {
        ...state,
        isGetting:false,
        profile:action.profile
      }
     case FIRST_LOAD_USER:
      return {
        ...state,
        isSearchUserLoading:true
      }
     case LOAD_USER:
      return {
        ...state,
        isSearchUserLoading:false,
        userInfo:action.userInfo
      }
     case LOAD_USER_FAILURE:
      return {
       ...state,
       isSearchUserLoading:false
     }
     case LOAD_USER_SUCCESS:
      return {
        ...state,
        isSearchUserLoading:false,
        userInfo: action.userInfo
      }
    default: {
      return state;
    }
  }
};
