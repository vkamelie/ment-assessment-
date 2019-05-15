import axios from "axios";

const ADD_TASK = "ADD_TASK";
const REQUEST_TASKS = "REQUEST_TASKS";
const REMOVE_TASK = "REMOVE_TASK";
const TASK_DONE = "TASK_DONE";
const UPDATE_TASK = "UPDATE_TASK";

const initialState = {
  tasks: []
};

export default function reducer(state = initialState, action) {
  console.log(initialState);
  switch (action.type) {
    case ADD_TASK + "_FULFILLED":
      console.log(action.payload);
      return { tasks: action.payload };

    case REQUEST_TASKS + "_FULFILLED":
      return { ...state, tasks: action.payload };

    case REMOVE_TASK:
      return { tasks: action.payload };
    case TASK_DONE + "_FULFILLED":
      return { tasks: action.payload };
    case UPDATE_TASK + "_FULFILLED":
      return { tasks: action.payload };
    default:
      return state;
  }
}

// export function addTask(id, title, description, complete) {
//   return {
//     type: ADD_TASK,
//     payload: axios.post("https://practiceapi.devmountain.com/api/tasks", {
//       id,
//       title,
//       description,
//       complete
//     })
//   };
// }

export function addTask(title, description) {
  console.log("hit", title, description);
  let data = axios
    .post("https://practiceapi.devmountain.com/api/tasks", {
      title: title,
      description: description
    })
    .then(res => {
      return res.data;
    });
  return {
    type: ADD_TASK,
    payload: data
  };
}

export function requestTasks() {
  let data = axios
    .get("https://practiceapi.devmountain.com/api/tasks")
    .then(res => res.data);
  return {
    type: REQUEST_TASKS,
    payload: data
  };
}

export function removeTask(id) {
  let data = axios
    .delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
    .then(res => {
      return res.data;
    });
  return {
    type: REMOVE_TASK,
    payload: data
  };
}

export function taskDone(id) {
  let data = axios
    .put(`https://practiceapi.devmountain.com/api/tasks/${id}`)
    .then(res => {
      return res.data;
    });
  return {
    type: TASK_DONE,
    payload: data
  };
}

export function updateTask(id, update) {
  console.log("update hit", id, update);
  let data = axios

    .patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, {
      title: update
    })
    .then(res => {
      return res.data;
    });
  return {
    type: UPDATE_TASK,
    payload: data
  };
}
