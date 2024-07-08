import axios from "axios";
import { localStorageItemKey } from "../config/config";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authData = localStorage.getItem(localStorageItemKey);
        if (authData) {
            const token = authData;
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data.token) {
            localStorage.setItem(localStorageItemKey, response.data.token);
            const { token, ...dataWithoutToken } = response.data;
            return { ...response, data: dataWithoutToken };
        }
        return response;
    },
    (error) => {
        return Promise.reject(error.response);
    }
);

export default axiosInstance;
