import {
  SEARCH_LOCATION,
  SEARCH_LOCATION_SUCCESS,
  SEARCH_LOCATION_FAILURE,
  CHOOSE_LOCATION
} from '../reducers/diary';
const ApiKey = require('../config/Google_Api_config');

function searching(){
  return {
    type:SEARCH_LOCATION
  }
}

function searchLocationSuccess(locations){
  return dispatch => {
    dispatch({
      type:SEARCH_LOCATION_SUCCESS,
      locations
    })
  }
}

function searchLocationFailure(err){
  return dispatch => {
    dispatch({
      type:SEARCH_LOCATION_FAILURE,
      err
    })
  }
}

export function searchNearbyLocation(location){
  return dispatch => {
    dispatch(searching())
    const lat = location.coords.latitude
    const lng = location.coords.longitude
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&key=${ApiKey}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then(res => {
      dispatch(searchLocationSuccess(res.results))
    })

  }
}

export function chooseAddress(index){
  return dispatch => {
    dispatch({
      type:CHOOSE_LOCATION,
      index
    })
  }
}
