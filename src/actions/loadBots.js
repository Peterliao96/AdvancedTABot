import {
  LOAD_BOT,
  LOAD_BOT_FAILURE,
  LOAD_BOT_SUCCESS
} from '../reducers/bot';
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

export function getBots(data){
  return dispatch => {
    dispatch(loadBot())
    callApi('/loadBots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response =>
        response.json()
      )
      .then(res => {
        dispatch(loadBotSuccess(res.BotsArr))
      })
      .catch(err => {
        console.log(err)
        dispatch(loadBotFailure(err))
      })
  }
}
