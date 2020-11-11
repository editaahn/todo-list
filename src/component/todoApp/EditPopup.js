import React, { useState } from "react";

const EditPopup = ({ type, title, id, content, changeValue, setEditMode, maxLength = 500 }) => {
  const [inputElValue, setInputElValue] = useState("");

      
  const completeEditModeEvt = () => {
    setEditMode(false);

    if (type === "NEW_MANAGER") {
      changeValue({'name':inputElValue})
      .then(() => {
        const wrapperEl = document.querySelector(".app-wrapper");
        wrapperEl.scrollLeft = wrapperEl.scrollWidth;
      });
      return;
    }

    changeValue(id, inputElValue);
  };
  return (
    <div className="popup-wrapper">
      <div className="popup">
        <h4>{title}</h4>
        <h5>{ type === "TODO_CONTENT" ? 'Note' : 'List name' }</h5>
        { type === "TODO_CONTENT" ? 
        <textarea
          className="popup__input"
          maxLength={maxLength}
          onChange={e => setInputElValue(e.target.value)}
          defaultValue={content}
        />
        :
        <input
          className="popup__input"
          maxLength={maxLength}
          onChange={e => setInputElValue(e.target.value)}
          defaultValue={content}
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
