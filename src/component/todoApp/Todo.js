import React from "react";

const Todo = ({
  drag,
  content,
  // id: dom 접근용 element id, todo_id: todo의 DB 고유식별자
  id,
  todo_id,
  deleteTodo,
  setTodoEditMode,
  setEditingTodoID,
}) => {
  const confirmDeletion = () => {
    window.confirm("정말 삭제하시겠습니까?") && deleteTodo(todo_id);
  };
  const editEvt = () => {
    setTodoEditMode(true);
    setEditingTodoID(todo_id);
  };
  return (
    <li id={id} className="todo" draggable={true} onDragStart={(e) => drag(e)}>
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
