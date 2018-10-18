import {
  DELETE_BOT,
  DELETE_BOT_SUCCESS,
  DELETE_BOT_FAILURE,
  LOAD_BOT_FAILURE,
  LOAD_BOT_SUCCESS
} from '../reducers/bot';
import callApi from '../helpers/api';
import {Alert}from 'react-native'
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

function deletingBot(){
  return {
    type: DELETE_BOT
  }
}

function deleteBotFailure(err){
  return dispatch => {
    dispatch({
      type: DELETE_BOT_FAILURE,
      err
    })
  }
}

function deleteBotSuccess(BotData){
  return dispatch => {
    dispatch({
      type: DELETE_BOT_SUCCESS,
      BotData
    })
  }
}

export function deleteBot(data){
  return dispatch => {
    dispatch(deletingBot())
    callApi('/deleteBot',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      Alert.alert(res.message)
      dispatch(deleteBotSuccess(res.BotData))
      const loadBotData = {
        UserId: data.UserId
      }
      callApi('/loadBots',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loadBotData),
      })
      .then(response => response.json())
      .then(res => {
        dispatch(loadBotSuccess(res.BotsArr))
        dispatch(NavigationActions.navigate({routeName:'FriendGroupScreen'}))
      })
      .catch(err => {
        console.log(err);
        dispatch(loadBotFailure(err))
      })
    })
    .catch(err => {
      console.log(err);
      dispatch(deleteBotFailure(err))
    })
  }
}
