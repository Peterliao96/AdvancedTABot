import {
  UPLOAD_MY_AVATAR,
  UPLOAD_MY_AVATAR_FAILURE,
  UPLOAD_MY_AVATAR_SUCCESS,
  UPLOAD_BOT_AVATAR,
  UPLOAD_BOT_AVATAR_FAILURE,
  UPLOAD_BOT_AVATAR_SUCCESS,
  SHOW_BOT_AVATAR,
  SHOW_BOT_AVATAR_FAILURE,
  SHOW_BOT_AVATAR_SUCCESS,
  SHOW_MY_AVATAR,
  SHOW_MY_AVATAR_SUCCESS
} from '../reducers/images';
import callApi from '../helpers/api';

function showingMe(){
  return {
    type:SHOW_MY_AVATAR
  }
}

function showMyAvatarSuccess(MyAvatar){
  return dispatch => {
    dispatch({
      type:SHOW_MY_AVATAR_SUCCESS,
      MyAvatar
    })
  }
}

export function showMyAvatar(uri){
  return dispatch => {
    dispatch(showingMe())
    dispatch(showMyAvatarSuccess(uri));
  }
}

function showingBot(){
  return {
    type:SHOW_BOT_AVATAR
  }
}


function showBotAvatarFailure(err){
  return dispatch => {
    dispatch({
      type: SHOW_BOT_AVATAR_FAILURE,
      err
    })
  }
}

function showBotAvatarSuccess(BotAvatar){
  return dispatch => {
    dispatch({
      type: SHOW_BOT_AVATAR_SUCCESS,
      BotAvatar
    })
  }
}

export function showBotAvatar(uri){
  return dispatch => {
    dispatch(showingBot())
    dispatch(showBotAvatarSuccess(uri))
  }
}

function uploadingBot(){
  return {
    type:UPLOAD_BOT_AVATAR
  }
}

function uploadBotAvatarFailure(err){
  return dispatch => {
    dispatch({
      type:UPLOAD_BOT_AVATAR_FAILURE,
      err
    })
  }
}

function uploadBotAvatarSuccess(uploadBotData){
  return dispatch => {
    dispatch({
      type:UPLOAD_BOT_AVATAR_SUCCESS,
      uploadBotData
    })
  }
}

export function uploadBotAvatar(data){
  return dispatch => {
    dispatch(uploadingBot())
    callApi('/uploadAvatar/uploadBotAvatar',{
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
      dispatch(uploadBotAvatarSuccess(res.uploadBotData))
    })
    .catch(err => {
      console.log(err)
      dispatch(uploadBotAvatarFailure(err))
    })
  }
}

function uploadingMe(){
  return {
    type:UPLOAD_MY_AVATAR
  }
}

function uploadMyAvatarFailure(err){
  return dispatch => {
    dispatch({
      type:UPLOAD_MY_AVATAR_FAILURE,
      err
    })
  }
}

function uploadMyAvatarSuccess(uploadMyData){
  return dispatch({
    type:UPLOAD_MY_AVATAR_SUCCESS,
    uploadMyData
  })
}

export function uploadMyAvatar(data){
  return dispatch => {
    dispatch(uploadingMe())
    callApi('/uploadAvatar/uploadMyAvatar',{
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
      dispatch(uploadMyAvatarSuccess(res.uploadMyData))
    })
    .catch(err => {
      console.log(err)
      dispatch(uploadMyAvatarFailure(err))
    })
  }
}
