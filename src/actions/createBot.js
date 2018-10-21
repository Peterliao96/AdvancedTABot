import {Alert} from 'react-native';
import callApi from '../helpers/api';
import { NavigationActions } from 'react-navigation';
import {
  SUBMIT_BOT,
  SUBMIT_BOT_SUCCESS,
  SUBMIT_BOT_FAILURE,
  LOAD_BOT_FAILURE,
  LOAD_BOT_SUCCESS
} from '../reducers/bot';
import {
  CREATE_CONVERSATION_FAILURE,
  CREATE_CONVERSATION_SUCCESS,
  LOAD_CONVERSATIONS,
  LOAD_CONVERSATIONS_FAILURE,
  LOAD_CONVERSATIONS_SUCCESS
} from '../reducers/conversations'

function submitBotFailure(err){
  return dispatch => {
    dispatch({
      type: SUBMIT_BOT_FAILURE,
      err,
    })
  }
}

function loadConversation(){
  return dispatch => {
    dispatch({
      type:LOAD_CONVERSATIONS
    })
  }
}

function createConversationSuccess(conversations){
  return dispatch => {
    dispatch({
      type:CREATE_CONVERSATION_SUCCESS,
      conversations
    })
  }
}

function createConversationFailure(){
  return dispatch => {
    dispatch({
      type:CREATE_CONVERSATION_FAILURE
    })
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

function loadConversationFailure(err){
  return dispatch => {
    dispatch({
      type:LOAD_CONVERSATIONS_FAILURE,
      err
    })
  }
}


function submitBot(){
  return {
    type: SUBMIT_BOT
  }
}

function submitBotSuccess(BotData){
  return dispatch => {
    dispatch({
      type: SUBMIT_BOT_SUCCESS,
      BotData,
    })
  }
}

function loadBotFailure(err){
  return dispatch => {
    dispatch({
      type: LOAD_BOT_FAILURE,
      err
    })
  }
}

function loadBotSuccess(BotsArr){
  return dispatch => {
    dispatch({
      type: LOAD_BOT_SUCCESS,
      BotsArr
    })
  }
}

export function createBot(BotData){
  return dispatch => {
    dispatch(submitBot())
    callApi('/createBot',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(BotData),
    })
    .then(response => response.json())
    .then(res => {
      if(res){
        Alert.alert(res.message)
        dispatch(submitBotSuccess(BotData))
        const ConversationData = {
          UserId: BotData.UserId,
          BotId: res.BotId
        }
        const data = {
          UserId: BotData.UserId
        }
        callApi('/loadBots',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(res => {
          dispatch(loadBotSuccess(res.BotsArr))
          callApi('/createConversation/myFirstBotConversation',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(ConversationData),
          })
          .then(response => response.json())
          .then(res => {
            dispatch(createConversationSuccess(res.chatItem))
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
          })
          .catch(err => {
            dispatch(createConversationFailure(err))
          })
        })
        .catch(err => {
          console.log(err)
          dispatch(loadBotFailure(err))
        })
      }
    })
    .catch(err => {
      dispatch(submitBotFailure(err))
    })
  }
}
