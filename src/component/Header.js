import React from "react";
import { changeColorMode } from '../library/changeColorMode'

const Header = ({ setHistoryOpen, isHistoryOpen, setManagerAddMode }) => {
  return (
    <header className="app-header app-header--dark">
      <h1>To-do List</h1>
      <div className="app-header__button-wrapper">
        <button className="button--mode" onClick={(e) => changeColorMode(e.target)}>button to change mode</button>
        <button className="button--add-manager" onClick={() => setManagerAddMode(true)}></button>
        <button className="button--more" onClick={() => setHistoryOpen(!isHistoryOpen)}>history</button>
      </div>
    </header>
  )
}

export default Header;