import "./style.scss";
import { Button, Input, Radio } from "antd";
import format from "date-fns/format";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  actCreateNewTask,
  actDeleteTaskById,
  actUpdateTaskById,
} from "../../redux/features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { TASK_STATUS } from "../../constants/task.constant";
import { useEffect } from "react";

const schema = Yup.object().shape({
  title: Yup.string().required("Please input title"),
  creator: Yup.string().required("Please input creator"),
  description: Yup.string().required("Please input description"),
});

// @hookform/resolvers
const TaskForm = ({ isEdit = false, currentTask }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      title: "",
      creator: "",
      createAt: new Date(),
      status: TASK_STATUS.NEW,
      description: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const onValid = (formValue) => {
    if (isEdit) {
      dispatch(
        actUpdateTaskById({
          id: currentTask.id,
          taskUpdate: formValue,
        })
      );
      return;
    }
    dispatch(actCreateNewTask(formValue));
    navigate(ROUTES.ALL_TASK);
  };

  const handleDeleteTask = () => {
    dispatch(actDeleteTaskById(currentTask.id));
    navigate(ROUTES.ALL_TASK);
  };
  useEffect(() => {
    if (isEdit && !!currentTask.createAt) {
      reset({ ...currentTask, createAt: new Date(currentTask.createAt) });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTask]);

  const handleResetForm = () => {
    reset({ ...currentTask, createAt: new Date(currentTask.createAt) });
  };

  return (
    <div className="task-form-wrapper">
      <form className="task-form-container" onSubmit={handleSubmit(onValid)}>
        <div className="task-form">
          <label className="task-form__label">Title:</label>
          <Controller
            control={control}
            name="title"
            render={({ field }) => {
              return <Input placeholder="Please Input..." {...field} />;
            }}
          />
        </div>
        {!!errors.title?.message && (
          <span style={{ color: "red" }}>{errors.title?.message}</span>
        )}
        <div className="task-form">
          <label className="task-form__label">Creator:</label>
          <Controller
            control={control}
            name="creator"
            render={({ field }) => {
              return <Input placeholder="Please Input..." {...field} />;
            }}
          />
        </div>
        {!!errors.creator?.message && (
          <span style={{ color: "red" }}>{errors.creator?.message}</span>
        )}
        <div className="task-form">
          <label className="task-form__label">Create at:</label>
          <Controller
            control={control}
            name="createAt"
            render={({ field }) => {
              return (
                <Input
                  disabled
                  value={format(field.value, "yyyy-MM-dd HH:mm")}
                />
              );
            }}
          />
        </div>
        <div className="task-form">
          <label className="task-form__label">Description:</label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => {
              return <Input placeholder="Please Input..." {...field} />;
            }}
          />
        </div>
        {!!errors.description?.message && (
          <span style={{ color: "red" }}>{errors.description?.message}</span>
        )}
        {/* <div className="task-form-check">
          <label>
            <input type="checkbox" />
            New
          </label>
          <label>
            <input type="checkbox" />
            Doing
          </label>
          <label>
            <input type="checkbox" />
            Done
          </label>
        </div> */}
        {isEdit && (
          <div className="task-form">
            <label className="task-form__label"></label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Radio.Group onChange={field.onChange} value={field.value}>
                  <Radio value={TASK_STATUS.NEW}>{TASK_STATUS.NEW}</Radio>
                  <Radio value={TASK_STATUS.DOING}>{TASK_STATUS.DOING}</Radio>
                  <Radio value={TASK_STATUS.DONE}>{TASK_STATUS.DONE}</Radio>
                </Radio.Group>
              )}
            />
          </div>
        )}
        <div className="task-form-btn">
          {isEdit && <Button onClick={handleResetForm}>Reset</Button>}
          <Button htmlType="submit">Save</Button>
          {isEdit && <Button onClick={handleDeleteTask}>Delete</Button>}
          {/* <Button htmlType="submit">Reset</Button>
          <Button htmlType="submit">Delete</Button> */}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
