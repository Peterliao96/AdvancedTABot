import {
  FIRST_LOAD_USER,
  LOAD_USER,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS
} from '../reducers/user';
import callApi from '../helpers/api';
function firstLoadUser(){
  return {
    type: FIRST_LOAD_USER
  }
}
function loadUser(userInfo){
  return dispatch => {
    dispatch({
      type: LOAD_USER,
      userInfo
    })
  }
}

function loadUserFailure(err){
  return dispatch => {
    dispatch({
      type: LOAD_USER_FAILURE,
      err
    })
  }
}

function loadUserSuccess(userInfo){
  return dispatch => {
    dispatch({
      type: LOAD_USER_SUCCESS,
      userInfo
    })
  }
}

export function searchUser(SearchData){
  return dispatch => {
    dispatch(firstLoadUser())
    callApi('/loadSearchUser',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(SearchData),
    })
    .then(response =>
      response.json()
    )
    .then(res => {
      if(res.userInfo.length !== 0){
        dispatch(loadUserSuccess(res.userInfo))
      } else {
        dispatch(loadUser(res.userInfo))
      }
    })
    .catch(err => {
      dispatch(loadUserFailure(err))
    })
  }
}
