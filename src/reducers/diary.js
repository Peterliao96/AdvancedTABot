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
export const SHOW_IMAGE_LIST = 'SHOW_IMAGE_LIST';
export const SHOW_IMAGE_LIST_SUCCESS = 'SHOW_IMAGE_LIST_SUCCESS';
export const SHOW_IMAGE_LIST_FAILURE = 'SHOW_IMAGE_LIST_FAILURE';
export const SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE';
export const SET_MODAL_UNVISIBLE = 'SET_MODAL_UNVISIBLE';
export const SET_ZOOM_MODAL_VISIBLE = 'SET_ZOOM_MODAL_VISIBLE';
export const SEARCH_LOCATION = 'SEARCH_LOCATION';
export const SEARCH_LOCATION_SUCCESS = 'SEARCH_LOCATION_SUCCESS';
export const SEARCH_LOCATION_FAILURE = 'SEARCH_LOCATION_FAILURE';
export const CHOOSE_LOCATION = 'CHOOSE_LOCATION';

const initState = {
  isLoading:false,
  isSubmitting:false,
  isUploading:false,
  diaryList:[],
  myDiaryList:[],
  friendDiaryList:[],
  images:[],
  modalVisible:false,
  zoomViewModalVisible:false,
  chosenLocation:0,
  locations:[]
}

export default(state = initState, action) =>{
  switch (action.type) {
    case CHOOSE_LOCATION:
      return {...state,chosenLocation:action.index}
    case SEARCH_LOCATION:
      return {...state,isSearching:true}
    case SEARCH_LOCATION_FAILURE:
      return {...state,isSearching:false}
    case SEARCH_LOCATION_SUCCESS:
      return {...state,isSearching:false,locations:action.locations}
    case SET_ZOOM_MODAL_VISIBLE:
      return {...state,zoomViewModalVisible:action.ZoomData}
    case SET_MODAL_VISIBLE:
      return {...state,modalVisible:action.data}
    case SET_MODAL_UNVISIBLE:
      return {...state,modalVisible:action.data}
    case UPLOAD_IMAGE:
      return {...state,isUploading:true}
    case UPLOAD_IMAGE_FAILURE:
      return {...state,isUploading:false}
    case UPLOAD_IMAGE_SUCCESS:
      return {...state,isUploading:false,images:[...state.images].concat(action.images),modalVisible:false}
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
    case POSTING_DIARY_SUCCESS:
      return {
        ...state,
        isSubmitting:false,
        diaryList:[...state.diaryList].concat(action.diaryItem),
        myDiaryList:[...state.myDiaryList].concat(action.diaryItem),
        images:[],
        locations:[],
        chosenLocation:0
      }
    case POSTING_DIARY_FAILURE: {
      return {
        ...state,
        isSubmitting:false
      }
    }
    default: {
      return state;
    }
  }
};
