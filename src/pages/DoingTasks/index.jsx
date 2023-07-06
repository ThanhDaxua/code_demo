import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllTask,
  setNewPage,
} from "../../redux/features/tasks/taskSlice";
import { Pagination, Spin } from "antd";
import MainContentTask from "../../componenets/MainContentTask";
import { TASK_STATUS } from "../../constants/task.constant";

const DoingTasks = () => {
  const dispatch = useDispatch();
  const { isLoading, tasks, pagination, searchKey } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    dispatch(
      actFetchAllTask({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        status: TASK_STATUS.DOING,
      })
    );
    return () => {
      dispatch(setNewPage(1));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (newPage) => {
    dispatch(setNewPage(newPage));
    dispatch(
      actFetchAllTask({
        _page: newPage,
        _limit: pagination.limitPerPage,
        q: searchKey,
        status: TASK_STATUS.DOING,
      })
    );
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div> No tasks </div>
      ) : (
        <>
          <MainContentTask tasks={tasks} />
          <Pagination
            defaultPageSize={pagination.limitPerPage}
            current={pagination.currentPage}
            total={pagination.total}
            onChange={handleChangePage}
          />
        </>
      )}
    </div>
  );
};

export default DoingTasks;
