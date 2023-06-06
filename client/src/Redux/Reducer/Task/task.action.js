import axios from "axios";

// redux type
import {
  CREATE_TASK,
  DELETE_TASK,
  FETCH_TASK,
  STATUS_TASK,
  UPDATE_TASK,
} from "./task.type";

const BASE_URL = `http://localhost:4000`;
// const BASE_URL = `https://task-management-ga4v.onrender.com`;

export const createTask = (taskData) => async (dispatch) => {
  try {
    const newTask = await axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/task/create-task`,
      data: { data: taskData },
    });

    return dispatch({ type: CREATE_TASK, payload: newTask.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const getTask = () => async (dispatch) => {
  try {
    const tasks = await axios({
      method: "GET",
      url: `${BASE_URL}/api/v1/task/fetch-task`,
    });

    return dispatch({ type: FETCH_TASK, payload: tasks.data });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error });
  }
};

// updating task
export const updateTask = (data, id) => async (dispatch) => {
  try {
    // console.log(data);
    const task = await axios({
      method: "PUT",
      url: `${BASE_URL}/api/v1/task/update-task/${id}`,
      data: { data },
    });

    return dispatch({ type: UPDATE_TASK, payload: task.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
// updating stattus
export const updateTaskStatus = (data, id) => async (dispatch) => {
  try {
    // console.log(data);
    const task = await axios({
      method: "PUT",
      url: `${BASE_URL}/api/v1/task/set-status/${id}`,
      data: { data },
    });

    return dispatch({ type: STATUS_TASK, payload: task.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    // console.log(id);
    const tasks = await axios({
      method: "DELETE",
      url: `${BASE_URL}/api/v1/task/delete-task/${id}`,
    });
    return dispatch({ type: DELETE_TASK, payload: tasks.data });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error });
  }
};
