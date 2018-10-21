import callApi from '../helpers/api';
import {
  LOAD_MESSAGES,
  LOAD_MESSAGES_FAILURE,
  LOAD_MESSAGES_SUCCESS,
  SEND_MESSAGE
} from '../reducers/messages'
function loadingMsg(){
  return {
    type:LOAD_MESSAGES
  }
}

const loadMessagesSuccess = ({ messages, id }) => ({
  type: LOAD_MESSAGES_SUCCESS,
  id,
  messages,
});

const loadMessagesFailure = () => ({
  type: LOAD_MESSAGES_FAILURE,
});

export const loadMessages = data => dispatch => {
  dispatch(loadingMsg())
  callApi("/loadMessages", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(res => {
    dispatch(loadMessagesSuccess(res));
  })
  .catch(err => {
    console.log(err);
  });
};

export const sendMessage = (conversationId, message) => ({
  type: 'SEND_MESSAGE',
  conversationId,
  message,
});
