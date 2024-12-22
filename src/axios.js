// src/axios.js

import axios from "axios";

// Create an axios instance with the base URL of your backend
const api = axios.create({
  baseURL: "https://abdmobiles-backend.onrender.com/api", // This is the base URL of your server
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
