import { handleActions } from 'redux-actions';
import * as request from '../library/request';
import requestThunk from '../library/requestThunk';

//action 정의
const GET_TODO_DB = 'todoList/GET_TODO_DB';
const GET_TODO_DB_SUCCESS = 'todoList/GET_TODO_DB_SUCCESS';

const SET_MANAGER_NAME = 'todoList/SET_MANAGER_NAME';
const SET_MANAGER_NAME_SUCCESS = 'todoList/SET_MANAGER_NAME_SUCCESS';

const ADD_MANAGER = 'todoList/ADD_MANAGER';
const ADD_MANAGER_SUCCESS = 'todoList/ADD_MANAGER_SUCCESS';

const ADD_TODO = 'todoList/ADD_TODO';
const ADD_TODO_SUCCESS = 'todoList/ADD_TODO_SUCCESS';

const DELETE_TODO = 'todoList/DELETE_TODO';
const DELETE_TODO_SUCCESS = 'todoList/DELETE_TODO_SUCCESS';

const EDIT_TODO = 'todoList/EDIT_TODO';
const EDIT_TODO_SUCCESS = 'todoList/EDIT_TODO_SUCCESS';

const MOVE_TODO = 'todoList/MOVE_TODO';
const MOVE_TODO_SUCCESS = 'todoList/MOVE_TODO_SUCCESS';

//비동기 통신 액션 생성 함수
export const getTodoDB = requestThunk(GET_TODO_DB, request.getTodoDB);
export const setManagerName = requestThunk(SET_MANAGER_NAME, request.setManagerName);
export const addManager = requestThunk(ADD_MANAGER, request.addManager);
export const addTodo = requestThunk(ADD_TODO, request.addTodo);
export const deleteTodo = requestThunk(DELETE_TODO, request.deleteTodo);
export const editTodo = requestThunk(EDIT_TODO, request.editTodo);
export const moveTodo = requestThunk(MOVE_TODO, request.moveTodo);

//초기상태
const initialState = {
  todos: [],
  managers: [],
  histories: [],
  orders: {},
};

//리듀서
const todoList = handleActions(
  {
    [GET_TODO_DB_SUCCESS]: (state, { payload: fetchedData }) => fetchedData,
    [ADD_MANAGER_SUCCESS]: (state, { payload: newManager }) => ({
      ...state,
      managers: [...state.managers, newManager]
    }),
    [SET_MANAGER_NAME_SUCCESS]: (state, { payload: newManager }) => ({
      ...state,
      managers: state.managers.reduce((acc, prevManager) => {
        prevManager.manager_id === newManager.manager_id
          ? acc.push(newManager)
          : acc.push(prevManager);
        return acc;
      }, []),
    }),
    [ADD_TODO_SUCCESS]: (state, { payload: { todo, history, order } }) => ({
      ...state,
      todos: state.todos.concat(todo),
      histories: [ ...state.histories, { ...history, ...todo } ],
      orders: {
        ...state.orders,
        [todo.manager_id]: order
      }
    }),
    [DELETE_TODO_SUCCESS]: (state, { payload: { todo, history, order } }) => ({
      ...state,
      todos: state.todos.filter(prevTodo => prevTodo.todo_id !== todo.todo_id),
      histories: [ ...state.histories, { ...history, ...todo } ],
      orders: {
        ...state.orders,
        [history.prev_manager_id]: order
      }
    }),
    [MOVE_TODO_SUCCESS]: (state, { payload: { todo, history, orders, } }) => ({
      ...state,
      todos: state.todos.reduce((acc, prevTodo) => {
        return prevTodo.todo_id === todo.todo_id
          ? acc.concat(todo)
          : acc.concat(prevTodo);
      }, []),
      histories: [ ...state.histories, { ...history, ...todo } ],
      orders: {
        ...state.orders,
        [history.prev_manager_id]: orders.prev_manager_order,
        [todo.manager_id]: orders.curr_manager_order,
      }
    }),
    [EDIT_TODO_SUCCESS]: (state, { payload: { todo, history } }) => ({
      ...state,
      todos: state.todos.reduce((acc, prevTodo) => {
        return prevTodo.todo_id === todo.todo_id
          ? [ ...acc, todo ]
          : [ ...acc, prevTodo ];
      }, []),
      histories: [ ...state.histories, { ...history, ...todo } ],
    }),
  },
  initialState
);

export default todoList;