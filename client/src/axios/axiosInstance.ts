import axios from "axios";
import { localStorageItemKey } from "../config";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authData = localStorage.getItem(localStorageItemKey);
        if (authData) {
            const userInfo = JSON.parse(authData);
            config.headers["Authorization"] = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
