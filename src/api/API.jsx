import axios from "axios";

// const LOCAL_URL = "http://127.0.0.1:8000";
// const SERVER_URL = "http://localhost:34805/";
// const SERVER_URL = "http://3.3 5.117.87:34805/";
// const SERVER_URL = "http://3.3 5.117.87:34705/";
// const SERVER_URL = "http://3.35.1 17.87:34705/";
const SERVER_URL = "https://nftinfinity.world:34925/";

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
