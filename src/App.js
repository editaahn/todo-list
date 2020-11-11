import React, { useEffect, useState } from "react";
import Header from "./component/Header";
import TodoContainer from "./component/todoApp/TodoManagerContainer";
import HistoryContainer from "./component/historyWing/HistoryContainer";
import "./style/style.scss";
import EditPopup from "./component/todoApp/EditPopup";
import { connect } from "react-redux";
import { addManager } from "./redux-module/todoList";

const App = ({ addManager }) => {
  useEffect(() => {
    const colorMode = localStorage.getItem("color-mode");
    document.documentElement.setAttribute("color-mode", colorMode);
  });
  
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const [isManagerAddMode, setManagerAddMode] = useState(false);

  return (
    <React.Fragment>
      <Header
        setHistoryOpen={setHistoryOpen}
        isHistoryOpen={isHistoryOpen}
        setManagerAddMode={setManagerAddMode}
      />
      <HistoryContainer isHistoryOpen={isHistoryOpen} />
      <TodoContainer />
      {isManagerAddMode && 
        <EditPopup 
          type="NEW_MANAGER"
          title="새 컬럼 추가하기"
          changeValue={addManager}
          setEditMode={setManagerAddMode}
          maxLength={50}
        />
      }
    </React.Fragment>
  );
};

export default connect(
  ({ todoList }) => todoList,
  { addManager }
)(App);