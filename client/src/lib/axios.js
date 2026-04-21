import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:6767/api",
    withCredentials: true,
    });