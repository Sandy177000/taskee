import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ADD_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  GET_SORTED_TASKS,
  SERVER_URL,
  UPDATE_TASK,
} from "../constants";
import axios from "axios";

const initialState = {
  tasks: [],
  status: "idle",
};

export const addTaskAsync = createAsyncThunk(
  "task/addTask",
  async (taskData) => {
    console.log(taskData);
    const response = await axios.post(ADD_TASK, taskData);
    console.log(response.data);
    return response.data;
  }
);

export const getAllTasksAsync = createAsyncThunk(
  "task/getAllTasks",
  async () => {
    const response = await axios.get(GET_ALL_TASKS);
    console.log(response.data);
    return response.data;
  }
);


export const getSortedTasksAsync = createAsyncThunk(
  "task/getSortedTasks",
  async () => {
    const response = await axios.get(GET_SORTED_TASKS);
    console.log(response.data);
    return response.data;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTask",
  async (taskId) => {
    console.log(taskId);
    const response = await axios.post(DELETE_TASK, { taskId });

    console.log(response.status);
    if (response.status == 200) {
      return response.data;
    }

    return null;
  }
);
export const updateTaskAsync = createAsyncThunk(
  "task/updateTask",
  async (taskData) => {
    console.log(taskData);
    const response = await axios.put(UPDATE_TASK, taskData);
    console.log(response.data);
    return response.data;
  }
);


export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // sortTasks: (state) => {
    //   state.tasks.sort((b, a) => a.rating - b.rating);
    // },
  }, // <-non async functions are included in here
  extraReducers: (builder) =>
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = [...state.tasks, action.payload];
      })
      .addCase(getAllTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTasksAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = [...action.payload];
      })
      .addCase(getSortedTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSortedTasksAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.tasks = action.payload;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload)
          state.tasks = state.tasks.filter(
            (task) => task.id !== action.payload
          );
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.status = "idle";

        for (let i = 0; i < state.tasks.length; i++) {
          if (state.tasks[i].id === action.payload.id) {
            state.tasks[i] = action.payload;
            break;
          }
        }
      }),
});

//export const {sortTasks} = taskSlice.actions;

export const selectAllTasks = (state) => state.task.tasks;
export const selectStatus = (state) => state.task.status;

export default taskSlice.reducer;
