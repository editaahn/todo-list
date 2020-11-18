import { combineReducers } from 'redux';
import todoList from './todoList';
import loading from './loading';
import view from './view';

const rootReducer =
  combineReducers({
    todoList,
    loading,
    view
  })

export default rootReducer;