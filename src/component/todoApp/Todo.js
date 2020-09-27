import React from "react";

const Todo = ({
  drag,
  content,
  manager_id,
  todo_id,
  deleteTodo,
  setTodoEditMode,
  setEditingTodoID,
  index,
}) => {
  const confirmDeletion = () => {
    window.confirm("정말 삭제하시겠습니까?") && deleteTodo(todo_id);
  };
  const editEvt = () => {
    setTodoEditMode(true);
    setEditingTodoID(todo_id);
  };
  return (
    <li
      className="todo-wrapper"
      draggable={true}
      onDragStart={(e) => drag(e)}
      manager_id={manager_id}
      todo_id={todo_id}
      index={index}
    >
      <div className="todo">
        <p className="todo__content" onClick={editEvt}>
          {content}
        </p>
        <button className="button--delete" onClick={confirmDeletion}>
          삭제
        </button>
      </div>
    </li>
  );
};

export default Todo;