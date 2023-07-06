import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskAPIs } from "../../../apis/taskApis.js";
import { message } from "antd";
const initialState = {
  isLoading: false,
  tasks: [],
  currentTask: {},
  errors: {},
  pagination: {
    currentPage: 1,
    limitPerPage: 8,
    total: 8,
  },

  searchKey: "",
};

export const actFetchAllTask = createAsyncThunk(
  "tasks/fetchAllTask",
  async (params = {}) => {
    const response = await taskAPIs.getAllTasks(params);
    return {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
  }
);

export const actFetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId) => {
    const task = await taskAPIs.getTaskById(taskId);
    return task;
  }
);

export const actUpdateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({ id, taskUpdate }) => {
    await taskAPIs.updateTaskById(id, taskUpdate);
    return null;
  }
);
export const actDeleteTaskById = createAsyncThunk(
  "tasks/deleteTaskById",
  async (id) => {
    await taskAPIs.deleteTaskById(id);
    return null;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = state.payload;
    },
    resetCurrentTask: (state, action) => {
      state.currentTask = {};
    },
    setNewPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllTask.rejected, (state, action) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actFetchAllTask.fulfilled, (state, action) => {
      state.tasks = action.payload.data;
      state.isLoading = false;
      state.pagination.total = action.payload.total;
    });
    builder.addCase(actFetchTaskById.fulfilled, (state, action) => {
      state.currentTask = action.payload;
    });
    builder.addCase(actUpdateTaskById.fulfilled, (state, action) => {
      message.success("Cap nhap Task thanh cong");
    });
    builder.addCase(actDeleteTaskById.fulfilled, (state, action) => {
      message.success("Xoa' task thanh` cong^");
    });
  },
});

export const actCreateNewTask = (task) => {
  return async (dispatch) => {
    try {
      await taskAPIs.createTask(task);
      message.success("Tao moi' task thanh` cong");
    } catch (error) {}
  };
};

export const { actSetTasks, setLoading, setNewPage, setSearchKey } =
  taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
