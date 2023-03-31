import axios from "axios";

axios.defaults.baseURL = 'https://project-5-api.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'muiltpart/form-data'
axios.defaults.withCredentials = true