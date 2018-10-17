import{
  GET_REQUESTED_LIST,
  GET_REQUESTED_LIST_FAILURE,
  GET_REQUESTED_LIST_SUCCESS
} from '../reducers/request';
import callApi from '../helpers/api';

function getRequestedList(){
  return{
    type:GET_REQUESTED_LIST
  }
}

function getRequestedListFailure(err){
  return dispatch => {
    dispatch({
      type:GET_REQUESTED_LIST_FAILURE,
      err
    })
  }
}

function getRequestedListSuccess(requestedList){
  return dispatch => {
    dispatch({
      type:GET_REQUESTED_LIST_SUCCESS,
      requestedList
    })
  }
}

export function getRequested(data){
  return dispatch => {
    dispatch(getRequestedList())
    callApi('/friendRequest/getRequestedList',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(res => {
      dispatch(getRequestedListSuccess(res.requestedList))
    })
    .catch(err => {
      dispatch(getRequestedListFailure(err))
    })
  }
}
