import axios from "axios";

export const clientApi = axios.create({
  baseURL: "http://localhost:8000/hrm/",
  withCredentials: false,
  config: {
    headers: {
      "Content-Type": "application/json",
    },
  },
  /*   headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }, */
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
clientApi.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
