import { createAction, handleActions } from 'redux-actions';

//action 정의
const TOGGLE_VIEW_HISTORIES = 'view/TOGGLE_VIEW_HISTORIES';
const TOGGLE_VIEW_MANAGER_GENERATOR = 'view/TOGGLE_VIEW_MANAGER_GENERATOR';
const TOGGLE_VIEW_MANAGER_NAME_EDITOR = 'view/TOGGLE_VIEW_MANAGER_NAME_EDITOR';
const TOGGLE_VIEW_TODO_GENERATOR = 'view/TOGGLE_VIEW_TODO_GENERATOR';
const TOGGLE_VIEW_TODO_EDITOR = 'view/TOGGLE_VIEW_TODO_EDITOR';
const SET_TODO_ID_EDITING = 'view/SET_TODO_ID_EDITING';

//액션 생성 함수
export const toggleViewHistories = createAction(TOGGLE_VIEW_HISTORIES);
export const toggleViewManagerGenerator = createAction(TOGGLE_VIEW_MANAGER_GENERATOR);
export const toggleViewManagerNameEditor = createAction(TOGGLE_VIEW_MANAGER_NAME_EDITOR);
export const toggleViewTodoGenerator = createAction(TOGGLE_VIEW_TODO_GENERATOR);
export const toggleViewTodoEditor = createAction(TOGGLE_VIEW_TODO_EDITOR);
export const setTodoIdEditing = createAction(SET_TODO_ID_EDITING, id => id);

//초기상태
const initialState = {
  histories: false,
  managerGenerator: false,
  managerNameEditor: false,
  todoGenerator: false,
  todoEditor: false,
  todoIdEditing: null
};

const view = handleActions(
  {
    [TOGGLE_VIEW_HISTORIES]: state => ({
      ...state,
      histories: !state.histories
    }),
    [TOGGLE_VIEW_MANAGER_GENERATOR]: state => ({
      ...state,
      managerGenerator: !state.managerGenerator
    }),
    [TOGGLE_VIEW_MANAGER_NAME_EDITOR]: state => ({
      ...state,
      managerNameEditor: !state.managerNameEditor
    }),
    [TOGGLE_VIEW_TODO_GENERATOR]: state => ({
      ...state,
      todoGenerator: !state.todoGenerator
    }),
    [TOGGLE_VIEW_TODO_EDITOR]: state => ({
      ...state,
      todoEditor: !state.todoEditor
    }),
    [SET_TODO_ID_EDITING]: (state, action) => ({
      ...state,
      todoIdEditing: action.payload
    }),
  },
  initialState
);

export default view;