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

function submitBotFailure(err){
  return dispatch => {
    dispatch({
      type: SUBMIT_BOT_FAILURE,
      err,
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
        dispatch(NavigationActions.navigate({routeName:'FriendGroupScreen'}))
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
