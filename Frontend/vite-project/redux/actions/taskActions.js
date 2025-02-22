export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const SET_TASKS = 'SET_TASKS';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

export const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const setTasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks,
});
