import React from 'react';

const TodoManagerHeader = ({ setNameEditMode, todos, name, setAddMode, isAddMode }) => {
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
        <button
          className="button--add"
          onClick={() => setAddMode(!isAddMode)}
          style={{}}
        >
          새로운할일
        </button>
      </header>
  )
};

export default TodoManagerHeader;