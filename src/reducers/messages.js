export const LOAD_MESSAGES_FAILURE = 'LOAD_MESSAGES_FAILURE';
export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';
const initState = {
  loading:false
};

export default(state = initState, action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return {
        ...state,
        loading:true
      }
    case LOAD_MESSAGES_SUCCESS: {
      return {
        ...state,
        loading:false,
        [action.id]: action.messages,
      };
    }
    case LOAD_MESSAGES_FAILURE: {
      return initState;
    }
    case SEND_MESSAGE: {
      if (state[action.id]) {
        return {
          ...state,
          [action.id]: [
            action.message,
            ...state[action.id]
          ]
        };
      }
      return {
        ...state,
        [action.id]: [action.message],
      };
    }
    default: {
      return state;
    }
  }
};
