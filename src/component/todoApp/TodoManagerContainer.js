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
            todos={todos.filter(todo => todo.manager_id === manager.manager_id)}
            setManagerName={(id,name) => setManagerName({'manager_id': id, "name": name})}
            addTodo={(id,content,order) => addTodo({'manager_id': id, 'content': content, 'order': order.join(',')})}
            deleteTodo={(id,order) => deleteTodo({'id': id, 'order': order})}
            editTodo={(id,content) => editTodo({'todo_id': id, 'content': content})}
            moveTodo={(param1,param2,param3,param4,param5) => moveTodo({
              'todo_id': param1, 'prev_manager_id': param2, 'manager_id': param3, 'index': param4, 'order': param5,
            })}
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