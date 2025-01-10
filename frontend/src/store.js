import {applyMiddleware, createStore} from 'redux';
import AuthReducer from './redux/Auth/AuthReducer';
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { JobReducer } from './redux/Job/JobReducer';
const store=createStore(combineReducers({AuthReducer,JobReducer}),applyMiddleware(thunk));

export default store;


