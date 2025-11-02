import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem("auth-storage");
  
  if (authStorage) {
    const token = JSON.parse(authStorage).token;
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
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
