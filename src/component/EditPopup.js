import React, { useState } from "react";

const EditPopup = ({ type, id, content, changeValue, setEditMode, maxLength = 500 }) => {
  const [inputElValue, setInputElValue] = useState("");
  const completeEditModeEvt = () => {
    changeValue(id, inputElValue);
    setEditMode(false);
  };
  return (
    <div className="popup-wrapper">
      <div className="popup">
        <h4>{ type === "MANAGER_NAME" ? `Edit ${content}` : 'Edit note' }</h4>
        <h5>{ type === "MANAGER_NAME" ? 'Column name' : 'Note' }</h5>
        { type === "MANAGER_NAME" ? 
        <input
          className="popup__input"
          maxLength={maxLength}
          onChange={e => setInputElValue(e.target.value)}
        />
        : 
        <textarea
          className="popup__input"
          maxLength={maxLength}
          onChange={e => setInputElValue(e.target.value)}
        />
        }
        <button
          className="button--complete"
          onClick={completeEditModeEvt}
          disabled={!inputElValue}
        >
          Update
        </button>
        <button
          className="button--close"
          onClick={() => setEditMode(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPopup;
