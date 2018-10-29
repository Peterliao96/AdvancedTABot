import{
  POSTING_DIARY,
  POSTING_DIARY_SUCCESS,
  POSTING_DIARY_FAILURE
} from '../reducers/diary';
import callApi from '../helpers/api';
import {loadDiaries,loadMyDiaries} from './loadDiaries';

function posting(){
  return{
    type:POSTING_DIARY
  }
}

function postingDiaryFailure(err){
  return dispatch => {
    dispatch({
      type:POSTING_DIARY_FAILURE,
      err
    })
  }
}

function postingDiarySuccess(diaryItem){
  return dispatch => {
    dispatch({
      type:POSTING_DIARY_SUCCESS,
      diaryItem
    })
  }
}

export function postDiary(data){
  return dispatch => {
    callApi('/addDiary',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      dispatch(postingDiarySuccess(res.diary))
      const loadData = {
        UserId: data.UserId
      }
      dispatch(loadDiaries(loadData))
      dispatch(loadMyDiaries(loadData))
    })
  }
}
