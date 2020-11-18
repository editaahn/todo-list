import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTodoDB } from "../../redux-module/todoList";
import TodoManager from "./TodoManager";

const TodoManagerContainer = ({ managers, todos, orders, getTodoDB }) => {
  useEffect(() => {
    getTodoDB();
  }, [getTodoDB]);
  return (
    <div className="app-wrapper" style={{ overflowX: managers.length > 3 }}>
      <main className="app">
        {managers &&
          managers.map((manager) => (
            <TodoManager
              key={manager.manager_id}
              id={manager.manager_id}
              name={manager.name}
              todos={todos.filter(
                todo => todo.manager_id === manager.manager_id
              )}
              order={orders?.[manager.manager_id] || []}
            />
          ))}
      </main>
    </div>
  );
};

export default connect(
  ({ todoList, loading }) => ({ ...todoList, ...loading }),
  { getTodoDB }
)(TodoManagerContainer);
