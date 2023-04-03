import axios from "axios";

axios.defaults.baseURL = 'https://project-5-api.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Axios interceptor for requesting from the API
export const axiosReq = axios.create();
// Axios interceptor for responding to the API, refresh login token
export const axiosRes = axios.create();