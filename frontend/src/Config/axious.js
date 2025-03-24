import axios from 'axios'

const BASE_URI = import.meta.env.VITE_BASESERVER_URI;

const axiosInstance = axios.create({
    baseURL: BASE_URI,
    withCredentials :true,
})


export default axiosInstance;
