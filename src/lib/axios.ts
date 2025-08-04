import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
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