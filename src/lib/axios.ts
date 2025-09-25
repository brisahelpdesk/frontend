import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem("auth-storage");
  if (authStorage) {
    const authStorageParsed = JSON.parse(authStorage);
    config.headers["Authorization"] = `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJoZWxwZGVzay5icmlzYWJyLmNvbS5iciIsInN1YiI6Im9kaWxvbkBicmlzYS5jb20uYnIiLCJleHAiOjE3NTg4MzQyNjYsImlhdCI6MTc1ODgzMDY2Nn0.QYYgUYzySzZRQ2jrxi3j91fg2X_4B1FtopYTyYP1V1wIUfrR8wp_Q_j8meuS1kWYnV_AOBytam7tjyJDn6r33J_b--iFbfHblNXCuIWNZ7XbXnbF-jp98f9euUZWgrz1UP_HjJOG0Trx3CQRXZEBaMBcqWFOtsRo5CTO4MyKz0VckmBwm0UEExOFt6D-QThzXYpIuab46Sa677cRPyb3G0tFPYgXRtgtbAhjIJAj5KaIkiIDfkKb52LyF_MANF3lPBGoWKq8Z7koORGiOQxkAYhf-2Az5dwCQb26nV-W6uX58NEXGKHwO2hTrJnt3slMGuNzYSqz3YSvqcHCw3mncg`;
  }
  return config;
});

export interface ApiRequest<T> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  params?: Record<string, any>;
  data?: T;
}

export const Api = {
  async fetch<T, R>(request: ApiRequest<T>): Promise<R> {
    const { method, endpoint, params, data } = request;
    try {
      const response = await api.request({
        method,
        url: endpoint,
        params,
        data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
