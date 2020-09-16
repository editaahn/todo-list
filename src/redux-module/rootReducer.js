import { combineReducers } from 'redux';
import todoList from './todoList';

const rootReducer =
  combineReducers({
    todoList
  })

export default rootReducer;