export const POSTING_DIARY = 'POSTING_DIARY';
export const POSTING_DIARY_SUCCESS = 'POSTING_DIARY_SUCCESS';
export const POSTING_DIARY_FAILURE = 'POSTING_DIARY_FAILURE';
export const LOAD_DIARY = 'LOAD_DIARY';
export const LOAD_DIARY_FAILURE = 'LOAD_DIARY_FAILURE';
export const LOAD_DIARY_SUCCESS = 'LOAD_DIARY_SUCCESS';
export const LOAD_FRIEND_DIARY_FAILURE = 'LOAD_FRIEND_DIARY_FAILURE';
export const LOAD_FRIEND_DIARY_SUCCESS = 'LOAD_FRIEND_DIARY_SUCCESS';
export const LOAD_MY_DIARY_FAILURE = 'LOAD_MY_DIARY_FAILURE';
export const LOAD_MY_DIARY_SUCCESS = 'LOAD_MY_DIARY_SUCCESS';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';

const initState = {
  isLoading:false,
  isSubmitting:false,
  isUploading:false,
  diaryList:[],
  myDiaryList:[],
  friendDiaryList:[],
  images:[]
}

export default(state = initState, action) =>{
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {...state,isUploading:true}
    case UPLOAD_IMAGE_FAILURE:
      return {...state,isUploading:false}
    case UPLOAD_IMAGE_SUCCESS:
      return {...state,isUploading:false,images:[state.images,action.image]}
    case LOAD_DIARY:
      return {...state, isLoading:true}
    case LOAD_DIARY_FAILURE:
      return {...state, isLoading:false}
    case LOAD_DIARY_SUCCESS:
      return {...state, isLoading:false,diaryList: action.diaryList}
    case LOAD_FRIEND_DIARY_FAILURE:
      return {...state, isLoading:false}
    case LOAD_FRIEND_DIARY_SUCCESS:
      return {...state, isLoading:false,diaryList: action.friendDiaryList}
    case LOAD_MY_DIARY_FAILURE:
      return {...state,isLoading:false}
    case LOAD_MY_DIARY_SUCCESS:
      return {...state,isLoading:false,myDiaryList:action.myDiaryList}
    case POSTING_DIARY:
      return {...state,isSubmitting:true}
    case POSTING_DIARY_SUCCESS: {
      return {isSubmitting:false,
        diaryList:[...state.diaryList,action.diary],
        myDiaryList:[...state.myDiaryList,action.diary]
      }
    }
    case POSTING_DIARY_FAILURE: {
      return initState;
    }
    default: {
      return state;
    }
  }
};
