import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8090/api/collections",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = token;
    return config;
  }
);

export interface ApiRequest<T> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  params?: Record<string, any>;
  data?: T;
}

export const Api = {
  async fetch<T, R>(request: ApiRequest<T>): Promise<R> {
    try {
      const response = await api.request({
        method: request.method,
        url: request.endpoint,
        params: request.params,
        data: request.data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}