import React, { useState } from "react";
import Todo from "./Todo";
import EditPopup from "./EditPopup";
import TodoGenerator from "./TodoGenerator";
import TodoManagerHeader from "./TodoManagerHeader"
import { drag, dragEnter, dragLeave, allowDrop, drop } from "../../library/dragAndDropEvent";
import { useDispatch } from "react-redux";
import { setManagerName, editTodo, moveTodo } from "../../redux-module/todoList";

const TodoManager = ({ todos, name, id, order }) => {
  const sortedTodos = order.reduce((acc, todoInOrder) => {
    return acc.concat(
      todos.find(todo => todo.todo_id === todoInOrder)
    );
  }, []);

  const dispatch = useDispatch();
  const onMoveTodo = (data) => dispatch( moveTodo(data) );

  const [isNameEditMode, setNameEditMode] = useState(false);
  const [isTodoEditMode, setTodoEditMode] = useState(false);
  const [editingTodoID, setEditingTodoID] = useState(null);
  const [isAddMode, setAddMode] = useState(false);

  return (
    <section id={"manager_" + id} className="manager manager--dark">
      <TodoManagerHeader
        id={id}
        setNameEditMode={setNameEditMode}
        todos={todos}
        name={name}
        setAddMode={setAddMode}
        isAddMode={isAddMode}
      />
      <div
        className="manager__generator"
        style={{ display: isAddMode ? "flex" : "none" }}
      >
        <TodoGenerator
          id={id}
          setAddMode={setAddMode}
          order={order}
        />
      </div>
      <ul
        className="manager__list"
        manager_id={id}
        onDrop={(e) => drop(e, onMoveTodo, order)}
        onDragOver={(e) => allowDrop(e)}
        onDragEnter={(e) => dragEnter(e)}
        onDragLeave={(e) => dragLeave(e)}
      >
        {sortedTodos.map((todo, i) => (
          <Todo
            key={todo.todo_id}
            manager_id={id}
            todo_id={todo.todo_id}
            content={todo.content}
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
          title={`Edit ${name}`}
          id={id}
          content={name}
          changeValue={(id, newName) =>
            dispatch( setManagerName({ manager_id: id, name: newName }) )
          }
          setEditMode={setNameEditMode}
          maxLength={50}
        />
      )}
      {isTodoEditMode && (
        <EditPopup
          type="TODO_CONTENT"
          title="Edit note"
          id={editingTodoID}
          content={todos.find((todo) => todo.todo_id === editingTodoID).content}
          changeValue={(id, content) =>
            dispatch(editTodo({ todo_id: id, content: content }))
          }
          setEditMode={setTodoEditMode}
          maxLength={50}
        />
      )}
    </section>
  );
};

export default TodoManager;