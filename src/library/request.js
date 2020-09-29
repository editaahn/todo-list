import axios from 'axios';

export const getTodoDB = () => axios.get('/todo-list/all');
export const setManagerName = params => axios.post('/todo-list/manager/name', params);
export const addTodo = params => axios.post('/todo-list/todo/new-todo', params);
export const deleteTodo = params => axios.post(`/todo-list/deleted-todo`, params);
export const editTodo = params => axios.post('/todo-list/todo/edited-todo', params);
export const moveTodo = params => axios.post('/todo-list/todo/moved-manager', params);