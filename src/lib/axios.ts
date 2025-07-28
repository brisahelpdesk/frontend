import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});

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
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}