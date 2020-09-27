import { handleActions } from 'redux-actions';
import * as api from '../library/request';
import requestThunk from '../library/requestThunk';

//action 정의
const GET_TODO_DB = 'todoList/GET_TODO_DB';
const GET_TODO_DB_SUCCESS = 'todoList/GET_TODO_DB_SUCCESS';

const SET_MANAGER_NAME = 'todoList/SET_MANAGER_NAME';
const SET_MANAGER_NAME_SUCCESS = 'todoList/SET_MANAGER_NAME_SUCCESS';

const ADD_TODO = 'todoList/ADD_TODO';
const ADD_TODO_SUCCESS = 'todoList/ADD_TODO_SUCCESS';

const DELETE_TODO = 'todoList/DELETE_TODO';
const DELETE_TODO_SUCCESS = 'todoList/DELETE_TODO_SUCCESS';

const EDIT_TODO = 'todoList/EDIT_TODO';
const EDIT_TODO_SUCCESS = 'todoList/EDIT_TODO_SUCCESS';

const MOVE_TODO = 'todoList/MOVE_TODO';
const MOVE_TODO_SUCCESS = 'todoList/MOVE_TODO_SUCCESS';

//비동기 통신 액션 생성 함수
export const getTodoDB = requestThunk(GET_TODO_DB, api.getTodoDB);
export const setManagerName = requestThunk(SET_MANAGER_NAME, api.setManagerName);
export const addTodo = requestThunk(ADD_TODO, api.addTodo);
export const deleteTodo = requestThunk(DELETE_TODO, api.deleteTodo);
export const editTodo = requestThunk(EDIT_TODO, api.editTodo);
export const moveTodo = requestThunk(MOVE_TODO, api.moveTodo);


//초기상태
const initialState = {
  todos: [],
  managers: [],
  history: [],
  orders: {},
};

//리듀서
const todoList = handleActions(
  {
    [GET_TODO_DB_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      managers: data.managers,
      todos: data.todos,
      history: data.history,
      orders: data.todos.reduce((acc, todo) => {
        todo.manager_id in acc
          ? acc[todo.manager_id].push(todo.todo_id)
          : acc[todo.manager_id] = [todo.todo_id];
        return acc;
      }, {}),
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
    [ADD_TODO_SUCCESS]: (state, { payload: { todo, history } }) => ({
      ...state,
      todos: state.todos.concat(todo),
      history: state.history.concat({ ...history, ...todo }),
      orders: {
        ...state.orders,
        [todo.manager_id]: [todo.todo_id, ...state.orders[todo.manager_id]]
      }
    }),
    [DELETE_TODO_SUCCESS]: (state, { payload: { todo, history } }) => ({
      ...state,
      todos: state.todos.filter(prevTodo => prevTodo.todo_id !== todo.todo_id),
      history: state.history.concat({ ...history, ...todo }),
      orders: {
        ...state.orders,
        [history.prev_manager_id]: state.orders[history.prev_manager_id].filter(prevTodo => prevTodo !== todo.todo_id)
      }
    }),
    [MOVE_TODO_SUCCESS]: (state, { payload: { todo, history, index } }) => ({
      ...state,
      todos: state.todos.reduce((acc, prevTodo) => {
        return prevTodo.todo_id === todo.todo_id
          ? acc.concat(todo)
          : acc.concat(prevTodo);
      }, []),
      history: state.history.concat({ ...history, ...todo }),
      orders: {
        ...state.orders,
        [history.prev_manager_id]: 
          state.orders[history.prev_manager_id].filter( movedTodoID => movedTodoID !== todo.todo_id ),
        [todo.manager_id]: 
          !state.orders[todo.manager_id] 
            ? [todo.todo_id] 
            : state.orders[todo.manager_id].reduce((acc, todoInOrder, i, arr) => {
              if (index === arr.length && i === arr.length-1)
                return acc.concat(todoInOrder, todo.todo_id) // 빈 공간에 drop한 경우 끝으로 붙임
              else if (i === index) 
                return acc.concat(todo.todo_id, todoInOrder) // todo li들 사이에 drop한 경우 drop 위치에 끼움
              else 
                return acc.concat(todoInOrder)
            }, []),
      }
    }),
    [EDIT_TODO_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      todos: state.todos.reduce((acc, prevTodo) => {
        prevTodo.todo_id === result.todo.todo_id
          ? acc.push(result.todo)
          : acc.push(prevTodo);
        return acc;
      }, []),
      history: state.history.concat({ ...result.history, ...result.todo }),
    }),
  },
  initialState
);

export default todoList;