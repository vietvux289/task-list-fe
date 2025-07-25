import axios from "axios";
import nprogress from "nprogress";

nprogress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 150,
  trickleSpeed: 150,
});

const instance = axios.create({
  // baseURL: "http://localhost:8080"
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    nprogress.start();
    // Attach access_token to Headers before request is sent
    if (typeof window !== undefined
      && window.localStorage
      && window.localStorage.getItem('access_token')
    ) {
      config.headers.Authorization =
        "Bearer " + window.localStorage.getItem("access_token");
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
      nprogress.done(); 

    // Any status code that lie within the range of 2xx cause this function to trigger
        // Customize response with response data
    if (response.data && response.data.data) {
      response.data = response.data.data;
        }
        return response;
  },
  function (error) {
    nprogress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Customize error response with response error
      if (error.response && error.response.data) {
          return error.response.data;
      }
    return Promise.reject(error);
  }
);

export default instance;