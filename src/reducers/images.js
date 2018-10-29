export const UPLOAD_MY_AVATAR = 'UPLOAD_MY_AVATAR';
export const UPLOAD_MY_AVATAR_FAILURE = 'UPLOAD_MY_AVATAR_FAILURE';
export const UPLOAD_MY_AVATAR_SUCCESS = 'UPLOAD_MY_AVATAR_SUCCESS';
export const UPLOAD_BOT_AVATAR = 'UPLOAD_BOT_AVATAR';
export const UPLOAD_BOT_AVATAR_FAILURE = 'UPLOAD_BOT_AVATAR_FAILURE';
export const UPLOAD_BOT_AVATAR_SUCCESS = 'UPLOAD_BOT_AVATAR_SUCCESS';
export const SHOW_BOT_AVATAR = 'SHOW_BOT_AVATAR';
export const SHOW_BOT_AVATAR_FAILURE = 'SHOW_BOT_AVATAR_FAILURE';
export const SHOW_BOT_AVATAR_SUCCESS = 'SHOW_BOT_AVATAR_SUCCESS';
export const SHOW_MY_AVATAR = 'SHOW_MY_AVATAR';
export const SHOW_MY_AVATAR_SUCCESS = 'SHOW_MY_AVATAR_SUCCESS';


const initState = {
  isShowingBot:false,
  isShowingMe: false,
  isUploading:false,
  uploadMyData :{},
  uploadBotData :{},
  BotAvatar:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  MyAvatar :'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
}

export default(state = initState, action) => {
  switch (action.type) {
    case SHOW_MY_AVATAR:
      return {
        ...state,
        isShowingMe:true
      }
    case SHOW_MY_AVATAR_SUCCESS:
      return {
        ...state,
        isShowingMe:false,
        MyAvatar: action.MyAvatar
      }
    case SHOW_BOT_AVATAR:
      return {
        ...state,
        isShowingBot:true
      }
    case SHOW_BOT_AVATAR_FAILURE:
      return {
        ...state,
        isShowingBot:false
      }
    case SHOW_BOT_AVATAR_SUCCESS:
      return {
        ...state,
        isShowingBot:false,
        BotAvatar:action.BotAvatar
      }
    case UPLOAD_MY_AVATAR:
      return {
        ...state,
        isUploading:true
      }
    case UPLOAD_MY_AVATAR_FAILURE:
      return {
        ...state,
        isUploading:false
      }
    case UPLOAD_MY_AVATAR_SUCCESS:
      return {
        ...state,
        isUploading:false,
        uploadMyData:action.uploadMyData
      }
    case UPLOAD_BOT_AVATAR:
      return {
        ...state,
        isUploading:true
      }
    case UPLOAD_BOT_AVATAR_FAILURE:
      return {
        ...state,
        isUploading:false
      }
    case UPLOAD_BOT_AVATAR_SUCCESS:
       return {
         ...state,
         isUploading:false,
         uploadBotData:action.uploadBotData
       }
    case 'CLEAR_ERROR': {
      return initState;
    }
    default: {
      return state;
    }
  }
};
