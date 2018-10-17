export const ADD_FRIEND = 'ADD_FRIEND';
export const ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS';
export const ADD_FRIEND_FAILURE = 'ADD_FRIEND_FAILURE';
export const GET_REQUESTED_LIST = 'GET_REQUESTED_LIST';
export const GET_REQUESTED_LIST_FAILURE = 'GET_REQUESTED_LIST_FAILURE';
export const GET_REQUESTED_LIST_SUCCESS = 'GET_REQUESTED_LIST_SUCCESS';
export const APPROVE_REQUEST = 'APPROVE_REQUEST';
export const APPROVE_REQUEST_FAILURE = 'APPROVE_REQUEST_FAILURE';
export const APPROVE_REQUEST_SUCCESS = 'APPROVE_REQUEST_SUCCESS';
export const IGNORE = 'IGNORE';
export const IGNORE_FAILURE = 'IGNORE_FAILURE';
export const IGNORE_SUCCESS = 'IGNORE_SUCCESS';

const initState = {
  isAddingFriend: false,
  isGettingRequested:false,
  isApproving:false,
  isIgnoring:false,
  requestList:[],
  requestedList:[]
}
export default (state = initState, action) => {
  switch (action.type) {
     case IGNORE:
      return {
        ...state,
        isIgnoring:true
      }
     case IGNORE_FAILURE:
      return {
        ...state,
        isIgnoring:false
      }
     case IGNORE_SUCCESS:
      return {
        ...state,
        isIgnoring:false,
        requestedList:action.requestedList
      }
     case APPROVE_REQUEST:
      return {
        ...state,
        isApproving:true
      }
     case APPROVE_REQUEST_FAILURE:
      return {
        ...state,
        isApproving:false
      }
     case APPROVE_REQUEST_SUCCESS:
      return {
        ...state,
        isApproving:false,
        friendList: action.friendList,
        requestedList:action.requestedList
      }
     case ADD_FRIEND:
      return {
        ...state,
        isAddingFriend:true
      }
     case ADD_FRIEND_FAILURE:
      return {
       ...state,
       isAddingFriend:false
     }
     case ADD_FRIEND_SUCCESS:
      return {
        ...state,
        isAddingFriend:false,
        requestList: action.requestList
      }
     case GET_REQUESTED_LIST:
      return{
        ...state,
        isGettingRequested:true
      }
     case GET_REQUESTED_LIST_FAILURE:
      return{
        ...state,
        isGettingRequested:false
      }
      case GET_REQUESTED_LIST_SUCCESS:
      return{
        ...state,
        isGettingRequested:false,
        requestedList:action.requestedList
      }
    default: {
      return state;
    }
  }
};
