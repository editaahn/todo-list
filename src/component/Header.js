import React from "react";
import { useDispatch } from "react-redux";
import { changeColorMode } from "../library/changeColorMode";
import { toggleViewHistories, toggleViewManagerGenerator } from "./../redux-module/view";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="app-header app-header--dark">
      <h1>To-do List</h1>
      <div className="app-header__button-wrapper">
        <button 
          className="button--mode" 
          onClick={changeColorMode}
        >
          button to change mode
        </button>
        <button
          className="button--add-manager"
          onClick={() => dispatch( toggleViewManagerGenerator() )}
        >
          button to add manager
        </button>
        <button
          className="button--more"
          onClick={() => dispatch( toggleViewHistories() )}
        >
          button to show histories
        </button>
      </div>
    </header>
  );
};

export default Header;
