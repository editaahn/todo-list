import React,{ useState } from "react";
import Header from "./component/Header";
import TodoContainer from "./component/todoApp/TodoManagerContainer";
import './style/style.css'
import HistoryContainer from "./component/historyWing/HistoryContainer";

const App = () => {
  const [isHistoryOpened, setHistoryOpened] = useState(false);
  return (
    <React.Fragment>
      <Header setHistoryOpened={setHistoryOpened} isHistoryOpened={isHistoryOpened} />
      <HistoryContainer isHistoryOpened={isHistoryOpened} />
      <TodoContainer />
    </React.Fragment>
  );
};

export default App;
