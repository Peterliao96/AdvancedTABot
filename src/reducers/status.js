export const CHANGE_STATUS_SUCCESS = 'CHANGE_STATUS_SUCCESS';
export const CHANGE_STATUS_FAILURE = 'CHANGE_STATUS_FAILURE';
export const CHANGE_STATUS = 'CHANGE_STATUS';
const initState = {
  seeStatus:1,
  isLoading:false
}

export default(state = initState, action) =>{
  switch (action.type) {
    case CHANGE_STATUS:
      return {...status,isLoading:true}
    case CHANGE_STATUS_SUCCESS:
      return {...state,seeStatus:action.seeStatus,isLoading:false}
    case CHANGE_STATUS_FAILURE: {
      return initState;
    }
    default: {
      return state;
    }
  }
};
