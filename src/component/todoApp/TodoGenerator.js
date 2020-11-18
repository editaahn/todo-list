import React, {useRef, useState} from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux-module/todoList";

const TodoGenerator = ({ id, setAddMode, order }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const inputEl = useRef(null);
  
  const completeAddModeEvt = () => {
    const params = {
      manager_id: id,
      content: input,
      order: order.join(","),
    };

    dispatch( addTodo(params) );

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
