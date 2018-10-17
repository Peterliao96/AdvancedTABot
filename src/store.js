import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//import logger from 'redux-logger'
import auth from './reducers/auth';
import bot from './reducers/bot';
import request from './reducers/request';
//import friends from './reducers/friends';
import user from './reducers/user';
import images from './reducers/images';
//import nav from './reducers/nav';
import conversations from './reducers/conversations';
import messages from './reducers/messages';
import error from './reducers/error';

const reducers = combineReducers({
  auth,
  //friends,
  images,
  user,
  bot,
  request,
  //applyMiddleware(logger),
  //nav,
  conversations,
  messages,
  error
});

const store = createStore(reducers, applyMiddleware(thunk));
export default store;
