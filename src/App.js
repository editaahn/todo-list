import React from "react";
import Header from "./component/Header";
import TodoContainer from "./component/TodoManagerContainer";
import './style/style.css'

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <TodoContainer />
    </React.Fragment>
  );
};

export default App;
