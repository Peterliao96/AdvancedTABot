import {
  LOAD_DIARY,
  LOAD_DIARY_FAILURE,
  LOAD_DIARY_SUCCESS,
  LOAD_MY_DIARY_SUCCESS,
  LOAD_MY_DIARY_FAILURE,
  LOAD_FRIEND_DIARY_FAILURE,
  LOAD_FRIEND_DIARY_SUCCESS
} from '../reducers/diary';
import callApi from '../helpers/api';

function loadingDiary(){
  return {
    type:LOAD_DIARY
  }
}

function loadDiaryFailure(err){
  return dispatch => {
    dispatch({
      type:LOAD_DIARY_FAILURE,
      err
    })
  }
}

function loadDiarySuccess(diaryList){
  return dispatch => {
    dispatch({
      type:LOAD_DIARY_SUCCESS,
      diaryList
    })
  }
}
function loadMyDiarySuccess(myDiaryList){
  return dispatch => {
    dispatch({
      type:LOAD_MY_DIARY_SUCCESS,
      myDiaryList
    })
  }
}

function loadMyDiaryFailure(err){
  return dispatch => {
    dispatch({
      type:LOAD_MY_DIARY_FAILURE,
      err
    })
  }
}

function loadFriendDiarySuccess(friendDiaryList){
  return dispatch => {
    dispatch({
      type:LOAD_FRIEND_DIARY_SUCCESS,
      friendDiaryList
    })
  }
}

function loadFriendDiaryFailure(err){
  return dispatch => {
    dispatch({
      type:LOAD_FRIEND_DIARY_FAILURE,
      err
    })
  }
}

export function loadDiaries(data){
  return dispatch => {
    dispatch(loadingDiary())
    callApi('/loadDiaries/loadAllDiaries',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      dispatch(loadDiarySuccess(res.allDiaries))
    })
  }
}

export function loadMyDiaries(data){
  return dispatch => {
    dispatch(loadingDiary())
    callApi('/loadDiaries/loadMyDiaries',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      dispatch(loadMyDiarySuccess(res.diary))
    })
  }
}

export function loadFriendDiaries(data){
  return dispatch => {
    dispatch(loadingDiary())
    callApi('/loadDiaries/loadFriendDiaries',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      dispatch(loadFriendDiarySuccess(res.diary))
    })
  }
}
