import axios from "axios";

// Use environment variable for baseURL
const api = axios.create({
  baseURL: "https://abdmobiles-backend.onrender.com/api",
  // baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
