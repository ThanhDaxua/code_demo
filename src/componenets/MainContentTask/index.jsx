import React from "react";
import "./style.scss";
import Task from "../Task";

const MainContentTask = (props) => {
  const renderTask = (tasks) => {
    return tasks.map((task) => {
      return <Task key={task.id} task={task} />;
    });
  };

  return <div className="main-content-task">{renderTask(props.tasks)}</div>;
};

export default MainContentTask;
