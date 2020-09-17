import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../redux-module/todoList";
import TodoManager from "./TodoManager";

const TodoManagerContainer = ({ managers, todos, getTodoDB, setManagerName, addTodo, deleteTodo, editTodo, moveTodo, loading, }) => {
  useEffect(() => {
    getTodoDB();
  }, []);

  return (
    <main className="app">
      {managers &&
        !loading.GET_TODO_DB &&
        managers.map((manager) => (
          <TodoManager
            key={manager.manager_id}
            id={manager.manager_id}
            name={manager.name}
            todos={todos.filter(
              (todo) => todo.manager_id === manager.manager_id
            )}
            setManagerName={(id,name) => setManagerName({'manager_id': id, "name": name})}
            addTodo={(id,content) => addTodo({'manager_id': id, 'content': content})}
            deleteTodo={id => deleteTodo(id)}
            editTodo={(id,content) => editTodo({'todo_id': id, 'content': content})}
            moveTodo={(param1,param2,param3) => moveTodo({
              'todo_id': param1, 'prev_manager_id': param2, 'current_manager_id': param3, 
            })}
          />
        ))}
    </main>
  );
}

export default connect(
  ({ todoList }) => todoList,
  actions
)(TodoManagerContainer);
