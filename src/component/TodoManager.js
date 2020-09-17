import React, { useState } from "react";
import Todo from "./Todo";
import EditPopup from "./EditPopup";
import TodoGenerator from "./TodoGenerator";

const TodoManager = ({
  todos,
  name,
  id,
  setManagerName,
  editTodo,
  addTodo,
  deleteTodo,
  moveTodo,
}) => {
  const [isNameEditMode, setNameEditMode] = useState(false);
  const [isTodoEditMode, setTodoEditMode] = useState(false);
  const [editingTodoID, setEditingTodoID] = useState(null);
  const [isAddMode, setAddMode] = useState(false);
  const sortedTodos = () => {
    return [...todos].sort((a, b) => {
      return a.todo_id > b.todo_id ? -1 : 1;
    });
  };
  const drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };
  const drop = (e) => {
    e.preventDefault();
    const todo_id = e.dataTransfer.getData("text").split('_')[1]; 
    const prev_manager_id = e.dataTransfer.getData("text").split('_')[0]; 
    const curr_manager_id =
      e.target.tagname === "SECTION"
        ? e.target.id.split("_")[1]
        : e.target.closest("section").id.split("_")[1];
    moveTodo(todo_id, prev_manager_id, curr_manager_id);
  };
  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <section 
        id={"manager_" + id}
        className="manager"
        onDrop={(e) => drop(e)}
        onDragOver={(e) => allowDrop(e)}
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
          <TodoGenerator id={id} setAddMode={setAddMode} addTodo={addTodo} />
        </div>
        <ul
          className="manager__list"
        >
          {sortedTodos().map((todo) => (
            <Todo
              key={todo.todo_id}
              id={`${id}_${todo.todo_id}`}
              content={todo.content}
              deleteTodo={deleteTodo}
              setTodoEditMode={setTodoEditMode}
              setEditingTodoID={setEditingTodoID}
              drag={drag}
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
            changeValue={editTodo}
            setEditMode={setTodoEditMode}
            maxLength={50}
          />
        )}
      </section>
    </React.Fragment>
  );
};

export default TodoManager;
