import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Automatically attach JWT to every API request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tasknest_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getTasks = async () => {
  const response = await API.get("/tasks/");
  return response.data;
};

export const createTask = async (task) => {
  const response = await API.post("/tasks/", task);
  return response.data;
};

export const updateTask = async (taskId, task) => {
  const response = await API.put(`/tasks/${taskId}`, task);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await API.delete(`/tasks/${taskId}`);
  return response.data;
};

export default API;