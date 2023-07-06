import React from "react";
import "./style.scss";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="side-bar-container">
      <ul className="side-bar-container__list">
        <li
          className={`side-bar-container__list-item ${
            ROUTES.ALL_TASK.includes(location.pathname) ? "active" : ""
          }`}
        >
          <Link to={ROUTES.ALL_TASK}>All Task</Link>
        </li>
        <li
          className={`side-bar-container__list-item ${
            ROUTES.NEW_TASK.includes(location.pathname) ? "active" : ""
          }`}
        >
          <Link to={ROUTES.NEW_TASK}>New Task</Link>
        </li>
        <li
          className={`side-bar-container__list-item ${
            ROUTES.DOING_TASK.includes(location.pathname) ? "active" : ""
          }`}
        >
          <Link to={ROUTES.DOING_TASK}>Doing Task</Link>
        </li>
        <li
          className={`side-bar-container__list-item ${
            ROUTES.DONE_NEW.includes(location.pathname) ? "active" : ""
          }`}
        >
          <Link to={ROUTES.DONE_NEW}>Done Task</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
