import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export default apiRequest;
