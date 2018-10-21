import callApi from '../helpers/api';
import {
  LOAD_CONVERSATIONS,
  LOAD_CONVERSATIONS_FAILURE,
  LOAD_CONVERSATIONS_SUCCESS
} from '../reducers/conversations'

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

export function loadConversation(data) {
  return dispatch => {
    dispatch(loadingConversation())
    callApi('/loadConversations',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
      dispatch(loadConversationSuccess(res.chatList))
    })
    .catch(err => {
      dispatch(loadConversationFailure(err))
    })
  }
}


export const loadConversations = () => dispatch => {
  callApi('/conversations', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(conversations => {
      if (!conversations.error) {
        dispatch(loadConversationsSuccess(conversations));
      } else {
        dispatch(loadConversationsFailure(conversations.message));
      }
    })
    .catch(err => {
      console.log(err);
    });
  return {
    type: 'LOAD_CONVERSATIONS',
  };
};

export const setCurrentConversation = conversationId => ({
  type: 'SET_CURRENT_CONVERSATION',
  conversationId,
});
