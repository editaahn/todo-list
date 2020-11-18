import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../redux-module/todoList";
import { toggleViewTodoEditor, setTodoIdEditing } from "../../redux-module/view";

const Todo = ({
  drag,
  content,
  manager_id,
  todo_id,
  index,
  order,
}) => {
  const dispatch = useDispatch();

  const confirmDeletion = () => {
    const params = {
      manager_id: manager_id,
      todo_id: todo_id,
      order: order.filter((todo) => todo !== todo_id).join(","),
    };

    window.confirm("정말 삭제하시겠습니까?") && 
      dispatch( deleteTodo(params) );
  };

  const editEvt = () => {
    dispatch( setTodoIdEditing(todo_id) );
    dispatch( toggleViewTodoEditor() );
  };

  return (
    <li
      className="todo-wrapper"
      draggable={true}
      onDragStart={(e) => drag(e, order, index)}
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