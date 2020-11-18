import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addManager } from "./redux-module/todoList";
import { toggleViewManagerGenerator } from "./redux-module/view";
import Header from "./component/Header";
import TodoContainer from "./component/todoApp/TodoManagerContainer";
import HistoryContainer from "./component/historyWing/HistoryContainer";
import EditPopup from "./component/todoApp/EditPopup";
import "./style/style.scss";

const App = () => {
  const view = useSelector(({ view }) => view);
  const dispatch = useDispatch();

  useEffect(() => {
    const colorMode = localStorage.getItem("color-mode");
    const isOSDark = window.matchMedia('(prefers-color-scheme : dark)').matches;
    document.documentElement.setAttribute("color-mode", 
      (colorMode === 'dark' || (!colorMode && isOSDark))
      ? 'dark' : 'light'
    );
  });

  return (
    <React.Fragment>
      <Header />
      <HistoryContainer />
      <TodoContainer />
      {view.managerGenerator && 
        <EditPopup 
          type="NEW_MANAGER"
          title="새 컬럼 추가하기"
          changeValue={() => dispatch( addManager() ) }
          setEditMode={() => dispatch( toggleViewManagerGenerator() ) }
          maxLength={50}
        />
      }
    </React.Fragment>
  );
};

export default App;