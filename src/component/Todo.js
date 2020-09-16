import React from "react";

const Todo = ({
  drag,
  content,
  id,
  deleteTodo,
  setTodoEditMode,
  setEditingTodoID,
}) => {
  const confirmDeletion = () => {
    window.confirm("정말 삭제하시겠습니까?") && deleteTodo(id);
  };
  const editEvt = () => {
    setTodoEditMode(true);
    setEditingTodoID(id);
  };
  return (
    <li id={'todo_'+id} className="todo" draggable={true} onDragStart={(e) => drag(e)}>
      <p className="todo__content" onClick={editEvt}>
        {content}
      </p>
      <button className="button--delete" onClick={confirmDeletion}>
        삭제
      </button>
    </li>
  );
};

export default Todo;
