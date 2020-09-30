import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux-module/todoList";
import TodoManager from "./TodoManager";

const TodoManagerContainer = ({ managers, todos, getTodoDB, setManagerName, addTodo, deleteTodo, editTodo, moveTodo, loading, orders }) => {
  useEffect(() => {
    getTodoDB();
  }, [getTodoDB]);

  return (
    <main className="app">
      {managers &&
        // !loading.GET_TODO_DB &&
        managers.map((manager) => (
          <TodoManager
            key={manager.manager_id}
            id={manager.manager_id}
            name={manager.name}
            todos={todos.filter(todo => 
              todo.manager_id === manager.manager_id)}
            setManagerName={(id,name) => 
              setManagerName({'manager_id': id, "name": name})}
            addTodo={(id,content,order) => 
              addTodo({'manager_id': id, 'content': content, 'order': order.join(',')})}
            deleteTodo={(manager_id,id,order) => 
              deleteTodo({'manager_id': manager_id, 'todo_id': id, 'order': order.filter(todo => todo !== id).join(',')})}
            editTodo={(id,content) => 
              editTodo({'todo_id': id, 'content': content})}
            moveTodo={data =>
              moveTodo(data)}
            order={orders[manager.manager_id] || []}
          />
        ))}
    </main>
  );
}

export default connect(
  ({ todoList, loading }) => ({...todoList, ...loading}),
  actions
)(TodoManagerContainer);