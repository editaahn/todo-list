import React, { useState } from "react";

const Header = ({ setHistoryOpen, isHistoryOpen, setManagerAddMode }) => {
  return (
    <header className="app-header">
      <h1>To-do List</h1>
      <div className="app-header__button-wrapper">
        <button className="button--add-manager" onClick={() => setManagerAddMode(true)}></button>
        <button className="button--more" onClick={() => setHistoryOpen(!isHistoryOpen)}>history</button>
      </div>
    </header>
  )
}

export default Header;