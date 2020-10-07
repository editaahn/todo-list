import React from "react";
import { changeMode } from '../library/changeMode'

const Header = ({ setHistoryOpen, isHistoryOpen, setManagerAddMode }) => {
  return (
    <header className="app-header app-header--dark">
      <h1>To-do List</h1>
      <div className="app-header__button-wrapper">
        <button className="button--mode--dark" onClick={(e) => changeMode(e.target)}>button to change mode</button>
        <button className="button--add-manager" onClick={() => setManagerAddMode(true)}></button>
        <button className="button--more" onClick={() => setHistoryOpen(!isHistoryOpen)}>history</button>
      </div>
    </header>
  )
}

export default Header;