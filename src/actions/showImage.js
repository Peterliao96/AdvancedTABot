import {
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAILURE
} from '../reducers/diary';

function uploading(){
  return {
    type:UPLOAD_IMAGE
  }
}

function uploadImageSuccess(images){
  return dispatch => {
    dispatch({
      type:UPLOAD_IMAGE_SUCCESS,
      images
    })
  }
}

function uploadImageFailure(err){
  return dispatch => {
    dispatch({
      type:UPLOAD_IMAGE_FAILURE,
      err
    })
  }
}

export function showImage(images){
  return dispatch => {
    dispatch(uploadImageSuccess(images))
  }
}
