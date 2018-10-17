import { NavigationActions } from 'react-navigation';
import {
  ADD_FRIEND,
  ADD_FRIEND_FAILURE,
  ADD_FRIEND_SUCCESS
} from '../reducers/request';
import{Alert} from 'react-native'
import callApi from '../helpers/api';

function addingFriend(){
  return {
    type: ADD_FRIEND
  }
}

function addFriendSuccess(requestList){
  return dispatch => {
    dispatch({
      type: ADD_FRIEND_SUCCESS,
      requestList
    })
  }
}

function addFriendFailure(err){
  return dispatch => {
    dispatch({
      type: ADD_FRIEND_FAILURE,
      error
    })
  }
}

export function addFriend(data){
  return dispatch => {
    dispatch(addingFriend())
    callApi('/addFriends',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      Alert.alert(res.message);
      dispatch(addFriendSuccess(res.friend))
      dispatch(NavigationActions.navigate({routeName:'AddFriendScreen'}))
    })
    .catch(err => {
      dispatch(addFriendFailure(err))
    })
  }
}
