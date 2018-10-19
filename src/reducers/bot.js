export const SUBMIT_BOT = 'SUBMIT_BOT';
export const SUBMIT_BOT_SUCCESS = 'SUBMIT_BOT_SUCCESS';
export const SUBMIT_BOT_FAILURE = 'SUBMIT_BOT_FAILURE';
export const LOAD_BOT = 'LOAD_BOT';
export const LOAD_BOT_SUCCESS = 'LOAD_BOT_SUCCESS';
export const LOAD_BOT_FAILURE = 'LOAD_BOT_FAILURE';
export const DELETE_FRIEND = 'DELETE_FRIEND';
export const DELETE_FRIEND_FAILURE = 'DELETE_FRIEND_FAILURE';
export const DELETE_FRIEND_SUCCESS = 'DELETE_FRIEND_SUCCESS';
export const EDIT_BOT = 'EDIT_BOT';
export const EDIT_BOT_SUCCESS = 'EDIT_BOT_SUCCESS';
export const EDIT_BOT_FAILURE = 'EDIT_BOT_FAILURE';
export const DELETE_BOT = 'DELETE_BOT';
export const DELETE_BOT_FAILURE = 'DELETE_BOT_FAILURE';
export const DELETE_BOT_SUCCESS = 'DELETE_BOT_SUCCESS';
export const GET_FRIENDLIST = 'GET_FRIENDLIST';
export const GET_FRIENDLIST_FAILURE = 'GET_FRIENDLIST_FAILURE';
export const GET_FRIENDLIST_SUCCESS = 'GET_FRIENDLIST_SUCCESS';

const initState = {
  isLoading: false,
  isDeleting: false,
  isGetBotLoading:false,
  isEditing:false,
  isGettingFriendList:false,
  friendData: {
    fullName:'',
    UserId:'',
    avatar:'',
    description: ''
  },
  BotData: {
    fullName:'',
    UserId:'',
    avatar:'',
    description: ''
  },
  BotsArr: [],
  friendList:[]
}

export default(state = initState, action) => {
  switch (action.type) {
    case EDIT_BOT:
      return {
        ...state,
        isEditing:true
      }
    case EDIT_BOT_FAILURE:
      return {
        ...state,
        isEditing:false
      }
    case EDIT_BOT_SUCCESS:
      return {
        ...state,
        isEditing:false,
        BotData:action.BotData
      }
    case DELETE_FRIEND:
      return{
        ...state,
        isDeleting:true
      }
    case DELETE_FRIEND_FAILURE:
      return{
        ...state,
        isDeleting:false
      }
    case DELETE_FRIEND_SUCCESS:
      return{
        ...state,
        isDeleting:false,
        friendData:{}
      }
    case GET_FRIENDLIST:
     return {
       ...state,
       isGettingFriendList:true
     }
    case GET_FRIENDLIST_FAILURE:
     return {
       ...state,
       isGettingFriendList:false
     }
    case GET_FRIENDLIST_SUCCESS:
     return {
       ...state,
       isGettingFriendList:false,
       friendList:action.friendList
     }
    case SUBMIT_BOT:
      return{
        ...state,
        isLoading:true
      }
    case SUBMIT_BOT_FAILURE:
      return{
        ...state,
        isLoading:false
      }
    case SUBMIT_BOT_SUCCESS:{
      return{
        ...state,
        isLoading:false,
        BotData:action.BotData
      }
    }
    case LOAD_BOT:
      return {
        ...state,
        isGetBotLoading: true
      }
    case LOAD_BOT_FAILURE:
      return {
        ...state,
        isGetBotLoading: false
      }
    case LOAD_BOT_SUCCESS:
      return {
        ...state,
        isGetBotLoading:false,
        BotsArr: action.BotsArr
      }
      case DELETE_BOT:
        return{
          ...state,
          isDeleting:true
        }
      case DELETE_BOT_FAILURE:
        return{
          ...state,
          isDeleting:false
        }
      case DELETE_BOT_SUCCESS:
        return{
          ...state,
          isDeleting:false,
          BotData: {}
        }
    case 'CLEAR_ERROR': {
      return initState;
    }
    default: {
      return state;
    }
  }
};
