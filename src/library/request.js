import axios from 'axios';

export const getTodoDB = () => axios.get('/todo-list/all');
export const setManagerName = params => axios.put('/todo-list/manager/name', params);
export const addTodo = params => axios.post('/todo-list/todo', params);
export const deleteTodo = id => axios.delete(`/todo-list/todo/${id}`);
export const editTodo = params => axios.put('/todo-list/todo', params);
export const moveTodo = params => axios.put('/todo-list/todo/new-manager', params);