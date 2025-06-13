import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../constants/endpoints";

const httpClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(async (config) => {
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.status === 401 || error.status === 403) {
      // Handle unauthorized or forbidden errors
      // You can redirect to login or show a message
      console.error("Unauthorized access - redirecting to login");
      // Optionally, you can clear any stored tokens or user data here
    }
    return Promise.reject(error.response.data);
  }
);

export default httpClient;
