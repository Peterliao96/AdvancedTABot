import {
  APPROVE_REQUEST,
  APPROVE_REQUEST_FAILURE,
  APPROVE_REQUEST_SUCCESS
} from '../reducers/request';
import {
  GET_FRIENDLIST,
  GET_FRIENDLIST_FAILURE,
  GET_FRIENDLIST_SUCCESS
} from '../reducers/bot';
import callApi from '../helpers/api';

function gettingFriendList(){
  return {
    type:GET_FRIENDLIST
  }
}

function getFriendListFailure(err){
  return dispatch => {
    dispatch({
      type: GET_FRIENDLIST_FAILURE,
      err
    })
  }
}

function getFriendListSuccess(friendList){
  return dispatch => {
    dispatch({
      type: GET_FRIENDLIST_SUCCESS,
      friendList
    })
  }
}


function approving(){
  return {
    type: APPROVE_REQUEST
  }
}

function approveRequestFailure(err){
  return dispatch => {
    dispatch({
      type: APPROVE_REQUEST_FAILURE,
      err
    })
  }
}

function approveRequestSuccess(friendList){
  return dispatch => {
    dispatch({
      type:APPROVE_REQUEST_SUCCESS,
      friendList
    })
  }
}
function hiddenButtonSuccess(requestedList){
  return dispatch => {
    dispatch({
      type:APPROVE_REQUEST_SUCCESS,
      requestedList
    })
  }
}

export function approveRequest(data){
  return dispatch => {
    dispatch(approving());
    callApi('/friendRequest/approveRequest',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      dispatch(approveRequestSuccess(res.friendList))
      dispatch(hiddenButtonSuccess(res.requestedList))
      dispatch(gettingFriendList());
      const loadFriendData = {
        UserId: data.UserId
      }
      callApi('/loadFriends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loadFriendData)
      })
      .then(response => response.json())
      .then(res => {
          dispatch(getFriendListSuccess(res.friendList))
      })
      .catch(err => {
        dispatch(getFriendListFailure(err))
      })
    })
    .catch(err => {
      dispatch(approveRequestFailure(err))
    })
  }
}
