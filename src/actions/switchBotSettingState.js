import callApi from '../helpers/api';
import {getBots} from './loadBots';

export function fixText(data){
  return dispatch => {
    callApi('/editAutoReply',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => {
      const loadBotData = {
        UserId : data.UserId
      }
      dispatch(getBots(loadBotData))
    })
  }
}

export function onSwitchState(data){
  return dispatch => {
    callApi('/showBotSettingState',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      const loadBotData = {
        UserId : data.UserId
      }
      dispatch(getBots(loadBotData))
    })
  }
}
