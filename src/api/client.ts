// src/api/client.ts
import axios from "axios";
import type { AxiosInstance } from "axios"; // Type-only import

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // json-server default port
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth tokens if needed
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log("error.response 1212", error.response.status);
      // Handle HTTP errors
      return Promise.reject({
        message: error.message || "An error occurred",
        status: error.response.status,
      });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
