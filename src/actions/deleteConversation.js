import {
  DELETE_CONVERSATION,
  DELETE_CONVERSATION_FAILURE,
  DELETE_CONVERSATION_SUCCESS,
  LOAD_CONVERSATIONS,
  LOAD_CONVERSATIONS_FAILURE,
  LOAD_CONVERSATIONS_SUCCESS
} from '../reducers/conversations';
import callApi from '../helpers/api';
import {Alert} from 'react-native';

function loadingConversation(){
  return {
    type:LOAD_CONVERSATIONS
  }
}

function loadConversationSuccess(conversations){
  return dispatch => {
    dispatch({
      type:LOAD_CONVERSATIONS_SUCCESS,
      conversations
    })
  }
}

function loadConversationFailure(err) {
  return dispatch => {
    dispatch({
      type:LOAD_CONVERSATIONS_FAILURE,
      err
    })
  }
}

function deletingConversation(){
  return {
    type:DELETE_CONVERSATION
  }
}

function deleteConversationFailure(err){
  return dispatch => {
    dispatch({
      type:DELETE_CONVERSATION_FAILURE,
      err
    })
  }
}

function deleteConversationSuccess(conversations){
  return dispatch => {
    dispatch({
      type:DELETE_CONVERSATION_SUCCESS,
      conversations
    })
  }
}

export function deleteConversation(data){
  return dispatch => {
    dispatch(deletingConversation())
    callApi('/deleteConversation',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
      Alert.alert(res.message);
      const loadData = {
        UserId: data.UserId
      }
      callApi('/loadConversations',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loadData)
      })
      .then(response => response.json())
      .then(res => {
        dispatch(loadConversationSuccess(res.chatList))
      })
      .catch(err => {
        dispatch(loadConversationFailure(err))
      })
    })
  }
}
