import {
  DELETE_FRIEND,
  DELETE_FRIEND_FAILURE,
  DELETE_FRIEND_SUCCESS,
  GET_FRIENDLIST,
  GET_FRIENDLIST_FAILURE,
  GET_FRIENDLIST_SUCCESS
} from '../reducers/bot';
import callApi from '../helpers/api';

function deleting(){
  return {
    type:DELETE_FRIEND
  }
}

function deleteFriendFailure(err){
  return dispatch => {
    dispatch({
      type:DELETE_FRIEND_FAILURE,
      err
    })
  }
}

function deleteFriendSuccess(friendData){
  return dispatch => {
    dispatch({
      type:DELETE_FRIEND_SUCCESS,
      friendData
    })
  }
}

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

export function deleteFriend(data){
  return dispatch => {
    dispatch(deleting())
    callApi('/deleteFriend',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      dispatch(deleteFriendSuccess(res.friendData))
      const loadFriendData = {
        UserId: data.UserId
      }
      dispatch(gettingFriendList())
      callApi('/loadFriends',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loadFriendData),
      })
      .then(response => response.json())
      .then(res => {
        dispatch(getFriendListSuccess(res.friendList))
      })
      .catch(err => {
        console.log(err);
        dispatch(getFriendListFailure(err))
      })
    })
  }
}
