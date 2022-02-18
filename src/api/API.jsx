import axios from "axios";

// const LOCAL_URL = "http://127.0.0.1:8000";
// const SERVER_URL = "http://localhost:34805/";
// const SERVER_URL = "http://nips1.net:34805/";
const SERVER_URL = "http://nips1.net:34705/";

export const URL = SERVER_URL;

const API = axios.create({
  baseURL: URL,
  timeout: 200000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default API;
