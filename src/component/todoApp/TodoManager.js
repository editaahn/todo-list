import React, { useState } from "react";
import Todo from "./Todo";
import EditPopup from "./EditPopup";
import TodoGenerator from "./TodoGenerator";
import { drag, dragEnter, dragLeave, allowDrop, drop } from "../../library/dragAndDropEvent";

const TodoManager = ({
  todos,
  name,
  id,
  setManagerName,
  editTodo,
  addTodo,
  deleteTodo,
  moveTodo,
  order,
}) => {

  const sortedTodos = order.reduce((acc, todoInOrder) => {
    return acc.concat(todos.find(todo => todo.todo_id === todoInOrder))
  }, []);

  const [isNameEditMode, setNameEditMode] = useState(false);
  const [isTodoEditMode, setTodoEditMode] = useState(false);
  const [editingTodoID, setEditingTodoID] = useState(null);
  const [isAddMode, setAddMode] = useState(false);

  return (
    <section 
      id={"manager_" + id}
      className="manager"
    >
      <header className="manager__header">
        <div className="manager__subject">
          <em className="manager__subject__count">{todos.length}</em>
          <h2
            className="manager__subject__title"
            onClick={() => setNameEditMode(true)}
          >
            {name}
          </h2>
        </div>
        <button
          className="button--add"
          onClick={() => setAddMode(!isAddMode)}
          style={{}}
        >
          새로운할일
        </button>
      </header>
      <div
        className="manager__generator"
        style={{ display: isAddMode ? "flex" : "none" }}
      >
        <TodoGenerator 
          id={id} 
          setAddMode={setAddMode} 
          addTodo={addTodo}
          order={order}
        />
      </div>
      <ul
        className="manager__list"
        manager_id ={id}
        onDrop={e => drop(e, moveTodo, order)}
        onDragOver={e => allowDrop(e)}
        onDragEnter={e => dragEnter(e)}
        onDragLeave={e => dragLeave(e)}
      >
        {sortedTodos.map((todo,i) => (
          <Todo
            key={todo.todo_id}
            manager_id={id}
            todo_id={todo.todo_id}
            content={todo.content}
            deleteTodo={deleteTodo}
            setTodoEditMode={setTodoEditMode}
            setEditingTodoID={setEditingTodoID}
            drag={drag}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            index={i}
            order={order}
        />
        ))}
      </ul>
      {isNameEditMode && (
        <EditPopup
          type="MANAGER_NAME"
          id={id}
          content={name}
          changeValue={setManagerName}
          setEditMode={setNameEditMode}
          maxLength={50}
        />
      )}
      {isTodoEditMode && (
        <EditPopup
          type="TODO_CONTENT"
          id={editingTodoID}
          content={todos.find(todo => todo.todo_id === editingTodoID).content}
          changeValue={editTodo}
          setEditMode={setTodoEditMode}
          maxLength={50}
        />
      )}
    </section>
  );
};

export default TodoManager;