export const LOAD_CONVERSATIONS = 'LOAD_CONVERSATIONS'
export const LOAD_CONVERSATIONS_FAILURE = 'LOAD_CONVERSATIONS_FAILURE';
export const LOAD_CONVERSATIONS_SUCCESS = 'LOAD_CONVERSATIONS_SUCCESS';
export const CREATE_CONVERSATION_SUCCESS = 'CREATE_CONVERSATION_SUCCESS';
export const CREATE_CONVERSATION_FAILURE = 'CREATE_CONVERSATION_FAILURE';
export const SET_CURRENT_CONVERSATION = 'SET_CURRENT_CONVERSATION';
export const DELETE_CONVERSATION = 'DELETE_CONVERSATION';
export const DELETE_CONVERSATION_SUCCESS = 'DELETE_CONVERSATION_SUCCESS';
export const DELETE_CONVERSATION_FAILURE = 'DELETE_CONVERSATION_FAILURE';

const initState = {
  currentConversationId: '',
  conversations: [],
  isLoading:false,
  isDeleting:false
};

export default(state = initState, action) =>{
  switch (action.type) {
    case DELETE_CONVERSATION:
      return {...state, isDeleting:true}
    case DELETE_CONVERSATION_FAILURE:
      return {...state, isDeleting:false}
    case DELETE_CONVERSATION_SUCCESS:
      return {...state, isDeleting:false,conversations:action.conversations}
    case LOAD_CONVERSATIONS: {
      return { ...state,isLoading:true}
    }
    case LOAD_CONVERSATIONS_SUCCESS: {
      return { ...state, conversations: action.conversations,isLoading:false };
    }
    case LOAD_CONVERSATIONS_FAILURE: {
      return initState;
    }
    case CREATE_CONVERSATION_SUCCESS: {
      return {
        conversations: [...state.conversations, action.conversation],
        currentConversationId: action.conversation.id,
      };
    }
    case CREATE_CONVERSATION_FAILURE: {
      return initState;
    }
    case SET_CURRENT_CONVERSATION: {
      return { ...state, currentConversationId: action.conversationId };
    }
    default: {
      return state;
    }
  }
};
