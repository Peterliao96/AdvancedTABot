import{
  SET_MODAL_VISIBLE,
  SET_MODAL_UNVISIBLE,
  SET_ZOOM_MODAL_VISIBLE
} from '../reducers/diary';

export function setModalVisible(data){
  return dispatch => {
    dispatch({
      type:SET_MODAL_VISIBLE,
      data
    })
  }
}

export function setModalUnVisble(data){
  return dispatch => {
    dispatch({
      type:SET_MODAL_UNVISIBLE,
      data
    })
  }
}

export function setZoomViewModalVisible(ZoomData){
  return dispatch => {
    dispatch({
      type:SET_ZOOM_MODAL_VISIBLE,
      ZoomData
    })
  }
}
