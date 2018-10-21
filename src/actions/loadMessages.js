import callApi from '../helpers/api';
import {
  LOAD_MESSAGES,
  LOAD_MESSAGES_FAILURE,
  LOAD_MESSAGES_SUCCESS,
  SEND_MESSAGE
} from '../reducers/messages'
import {loadConversation} from './loadConversations'
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

export const createMessage = data => dispatch => {
  callApi('/sendMessage/bot',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(res => {
    dispatch(sendMessage(data.chatId,res.msg))
    const loadData = {
      UserId:data.UserId,
      chatId:data.chatId
    }
    const loadConversationData = {
      UserId:data.UserId
    }
    dispatch(loadMessages(loadData))
    dispatch(loadConversation(loadConversationData))
  })
  .catch(err => {
    console.log(err)
  })
}

function sendMessage(id,message){
  return dispatch => {
    dispatch({
      type:SEND_MESSAGE,
      id,
      message
    })
  }
}
