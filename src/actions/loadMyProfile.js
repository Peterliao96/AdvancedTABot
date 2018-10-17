import {
  GET_MY_PROFILE,
  GET_MY_PROFILE_FAILURE,
  GET_MY_PROFILE_SUCCESS
} from '../reducers/user';
import callApi from '../helpers/api';

function gettingProfile(){
  return {
    type: GET_MY_PROFILE
  }
}

function getMyProfileFailure(err){
  return dispatch => {
    dispatch({
      type:GET_MY_PROFILE_FAILURE,
      err
    })
  }
}

function getMyProfileSuccess(profile){
  return dispatch => {
    dispatch({
      type:GET_MY_PROFILE_SUCCESS,
      profile
    })
  }
}

export function getMyProfile(data){
  return dispatch => {
    dispatch(gettingProfile())
    callApi('/getMyProfile',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      dispatch(getMyProfileSuccess(res.profile))
    })
    .catch(err => {
      dispatch(getMyProfileFailure(err))
    })
  }
}
