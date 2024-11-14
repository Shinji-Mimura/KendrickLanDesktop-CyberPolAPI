import axios from "axios";

const apiBaseUrl = (process.env.NODE_ENV === 'development') ? 
  "http://localhost:8080/" : window.origin;

let api = axios.create({
  baseURL: apiBaseUrl,
});

export default api;