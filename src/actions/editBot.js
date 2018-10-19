import {
  EDIT_BOT,
  EDIT_BOT_FAILURE,
  EDIT_BOT_SUCCESS,
  LOAD_BOT,
  LOAD_BOT_FAILURE,
  LOAD_BOT_SUCCESS
} from '../reducers/bot';
import {Alert} from 'react-native'
import callApi from '../helpers/api';


function loadBot(){
  return {
    type: LOAD_BOT
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

function editingBot(){
  return{
    type: EDIT_BOT
  }
}

function editBotSuccess(BotData){
  return dispatch => {
    dispatch({
      type:EDIT_BOT_SUCCESS,
      BotData
    })
  }
}

function editBotFailure(err){
  return dispatch => {
    dispatch({
      type:EDIT_BOT_FAILURE,
      err
    })
  }
}

export function editBot(data){
  return dispatch => {
    dispatch(editingBot())
    callApi('/editBot',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      if(res){
        Alert.alert(res.message)
        const loaddata = {
          UserId: data.UserId
        }
        callApi('/loadBots',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loaddata),
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
      dispatch(editBotFailure(err))
    })
  }
}
