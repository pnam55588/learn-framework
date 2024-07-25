import { baseUrl } from '@/config/api';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
    },
});

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        return Promise.reject(error);
    },
);

export const get = <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient.get<T>(url, config).then((response) => response.data);
};

export const getWithToken = <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<T> => {
    const token = localStorage.getItem('token');
    return apiClient
        .get<T>(url, {
            ...config,
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data);
};

export const post = <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient
        .post<T>(url, data, config)
        .then((response) => response.data);
};
export const postWithToken = <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
): Promise<T> => {
    const token = localStorage.getItem('token');
    return apiClient
        .post<T>(url, data, {
            ...config,
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data);
};

export const put = <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient
        .put<T>(url, data, config)
        .then((response) => response.data);
};

export const putWithToken = <T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
): Promise<T> => {
    const token = localStorage.getItem('token');
    return apiClient
        .put<T>(url, data, {
            ...config,
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data);
};

export const del = <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient.delete<T>(url, config).then((response) => response.data);
};

export const delWithToken = <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<T> => {
    const token = localStorage.getItem('token');
    return apiClient
        .delete<T>(url, {
            ...config,
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data);
};
