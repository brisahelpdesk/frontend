import { Api } from "@/lib/axios";
import type { LoginCredentials, LoginResponse } from "./auth-types";

export async function login(data: LoginCredentials): Promise<LoginResponse> {
  return await Api.fetch<LoginCredentials, LoginResponse>({
    endpoint: "/auth/login",
    method: "POST",
    data,
  });
}
