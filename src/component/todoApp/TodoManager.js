import React, { useState } from "react";
import { drag, dragEnter, dragLeave, allowDrop, drop } from "../../library/dragAndDropEvent";
import { useDispatch, useSelector } from "react-redux";
import { setManagerName, editTodo, moveTodo } from "../../redux-module/todoList";
import { toggleViewManagerNameEditor, toggleViewTodoEditor } from "../../redux-module/view";
import Todo from "./Todo";
import EditPopup from "./EditPopup";
import TodoGenerator from "./TodoGenerator";
import TodoManagerHeader from "./TodoManagerHeader"

const TodoManager = ({ todos, name, id, order }) => {
  const view = useSelector(({ view }) => view)
  const dispatch = useDispatch();
  const onMoveTodo = (data) => dispatch( moveTodo(data) );

  const sortedTodos = order.reduce((acc, todoInOrder) => {
    return acc.concat(
      todos.find(todo => todo.todo_id === todoInOrder)
    );
  }, []);

  const [isTodoGeneratorVisible, toggleTodoGenerator] = useState(false);

  return (
    <section id={"manager_" + id} className="manager manager--dark">
      <TodoManagerHeader
        id={id}
        setNameEditMode={() => dispatch( toggleViewManagerNameEditor() ) }
        todos={todos}
        name={name}
        toggleTodoGenerator={() => toggleTodoGenerator(!isTodoGeneratorVisible)}
      />
      <div
        className="manager__generator"
        style={{ display: isTodoGeneratorVisible ? "flex" : "none" }}
      >
        <TodoGenerator
          id={id}
          toggleTodoGenerator={toggleTodoGenerator}
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
            drag={drag}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            index={i}
            order={order}
          />
        ))}
      </ul>
      {view.managerNameEditor && (
        <EditPopup
          type="MANAGER_NAME"
          title={`Edit ${name}`}
          id={id}
          content={name}
          changeValue={(id, newName) =>
            dispatch( setManagerName({ manager_id: id, name: newName }) )
          }
          setEditMode={() => dispatch( toggleViewManagerNameEditor() ) }
          maxLength={50}
        />
      )}
      {view.todoEditor && view.todoIdEditing && (
        <EditPopup
          type="TODO_CONTENT"
          title="Edit note"
          id={view.todoIdEditing}
          content={todos.find((todo) => todo.todo_id === view.todoIdEditing)?.content}
          changeValue={(id, content) =>
            dispatch( editTodo({ todo_id: id, content: content }) )
          }
          setEditMode={() => dispatch( toggleViewTodoEditor() ) }
          maxLength={50}
        />
      )}
    </section>
  );
};

export default TodoManager;