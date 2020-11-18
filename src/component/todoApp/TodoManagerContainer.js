import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodoDB } from "../../redux-module/todoList";
import TodoManager from "./TodoManager";

const TodoManagerContainer = () => {
  const { managers, todos, orders } = 
    useSelector(({ todoList }) => todoList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( getTodoDB() );
  }, []);

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

export default TodoManagerContainer;