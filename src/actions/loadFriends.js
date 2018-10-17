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


export function getFriends(data){
  return dispatch => {
    dispatch(gettingFriendList());
    callApi('/loadFriends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
        dispatch(getFriendListSuccess(res.friendList))
    })
    .catch(err => {
      dispatch(getFriendListFailure(err))
    })
  }
}
