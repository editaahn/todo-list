import React, {useRef, useState} from "react";

const TodoGenerator = ({ id, addTodo, setAddMode, order }) => {
  const [input, setInput] = useState("");
  const inputEl = useRef(null);
  const completeAddModeEvt = () => {
    addTodo(id, input, order);
    inputEl.current.value = null;

    const listEl = inputEl.current.closest("section").lastChild;
    listEl.scrollTop = 0;
  };
  const cancelAddModeEvt = () => {
    setAddMode(false);
    inputEl.current.value = null;
  }

  return (
    <React.Fragment>
      <textarea
        ref={inputEl}
        className="generator__input generator__input--dark"
        placeholder="새 노트 입력"
        maxLength='500'
        onChange={e=>setInput(e.target.value)}
      />
      <div className="generator__buttons">
        <button
          className="button--complete"
          onClick={completeAddModeEvt}
          disabled={!input}
        >
          추가
        </button>
        <button
          className="button--cancel"
          onClick={cancelAddModeEvt}
        >
          취소
        </button>
      </div>
    </React.Fragment>
  );
};

export default TodoGenerator;
