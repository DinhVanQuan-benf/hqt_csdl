import axios from 'axios';
import { getToken, removeToken } from './auth';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                removeToken();
                window.location.href = '/';
                return Promise.reject(new Error('Phiên đăng nhập hết hạn!'));
            } else if (error.response.status === 403) {
                console.error('Lỗi 403:', error.response.data);
                return Promise.reject(new Error('Bạn không có quyền truy cập! Role trong token không khớp.'));
            }
        }
        return Promise.reject(error);
    }
);

export default instance;