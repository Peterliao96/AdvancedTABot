import {
  IGNORE,
  IGNORE_SUCCESS,
  IGNORE_FAILURE
} from '../reducers/request';
import callApi from '../helpers/api';

function ignoring(){
  return{
    type:IGNORE
  }
}

function ignoreFailure(err){
  return dispatch => {
    dispatch({
      type:IGNORE_FAILURE,
      err
    })
  }
}

function ignoreSuccess(requestedList){
  return dispatch => {
    dispatch({
      type:IGNORE_SUCCESS,
      requestedList
    })
  }
}

export function ignoreRequest(data){
  return dispatch => {
    dispatch(ignoring())
    callApi('/friendRequest/ignoreRequest',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      dispatch(ignoreSuccess(res.requestedList))
    })
    .catch(err => {
      dispatch(ignoreFailure(err))
    })
  }
}
