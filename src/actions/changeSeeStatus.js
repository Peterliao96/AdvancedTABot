import {
  CHANGE_STATUS,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAILURE
} from '../reducers/status';

function changingStatus(){
  return {
    type:CHANGE_STATUS
  }
}

function changeSeeStatusFailure(err){
  return dispatch => {
    dispatch({
      type:CHANGE_STATUS_FAILURE,
      err
    })
  }
}

function changeSeeStatusSuccess(seeStatus){
  return dispatch => {
    dispatch({
      type:CHANGE_STATUS_SUCCESS,
      seeStatus
    })
  }
}

export function changeSeeStatus(data){
  dispatch(changeSeeStatusSuccess(data.seeStatus))
}
