import {
  LOAD_DIARY,
  LOAD_DIARY_FAILURE,
  LOAD_DIARY_SUCCESS
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

export function loadDiaries(data){
  return dispatch => {
    dispatch(loadingDiary())
    callApi('/loadDiaries',{
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
