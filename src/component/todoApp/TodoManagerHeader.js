import React from "react";
import { useDispatch } from "react-redux";
import { deleteManager } from "../../redux-module/todoList";

const TodoManagerHeader = ({
  id,
  setNameEditMode,
  todos,
  name,
  setAddMode,
  isAddMode,
}) => {
  const dispatch = useDispatch();

  const deleteManagerEvt = () => {
    if (todos.length > 0){
      alert("Note가 포함된 목록은 삭제할 수 없습니다. Note를 전부 지우고 시도해주세요.");
      return;
    };
    window.confirm("삭제하시겠습니까?") && 
      dispatch( deleteManager({ manager_id: id }) );
  }
  return (
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
      <div className="manager__buttons">
        <button
          className="button--add"
          onClick={() => setAddMode(!isAddMode)}
        >
          새로운할일
        </button>
        <button 
          className="button--delete-manager"
          onClick={() => deleteManagerEvt()}
        >삭제</button>
      </div>
    </header>
  );
};

export default TodoManagerHeader;
