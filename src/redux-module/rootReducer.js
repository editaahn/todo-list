import { combineReducers } from 'redux';
import todoList from './todoList';
import loading from './loading';

const rootReducer =
  combineReducers({
    todoList,
    loading
  })

export default rootReducer;