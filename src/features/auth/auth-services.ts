import type { LoginCredentials, LoginResponse } from "./auth-types";

export async function login(props: LoginCredentials): Promise<LoginResponse> {
  console.log("Logging in with", props);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    token: "fake-token",
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      document: "123456789",
      email: "john.doe@example.com",
      department: {
        id: 1,
        name: "IT",
        description: "Information Technology",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}
