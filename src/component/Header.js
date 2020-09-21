import React from "react";

const Header = ({setHistoryOpened, isHistoryOpened}) => {
  return (
    <header className="app-header">
      <h1>To-do List</h1>
      <button className="button--more" onClick={() => setHistoryOpened(!isHistoryOpened)}>history</button>
    </header>
  )
}

export default Header;