import type { CreateUserSchemaType } from "./user.schema";
import type { User } from "./user.model";
import type { FilterState } from "./hooks/use-filter-user";

const users: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    document: "123456789",
    email: "john.doe@example.com",
    department: {
      id: 1,
      name: "Engineering",
      description: "Handles all engineering tasks",
    },
    isActive: true,
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-01T12:00:00Z",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    document: "987654321",
    email: "jane.smith@example.com",
    department: {
      id: 2,
      name: "Marketing",
      description: "Handles all marketing tasks",
    },
    isActive: false,
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-01T12:00:00Z",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    document: "123123123",
    email: "alice.johnson@example.com",
    department: {
      id: 1,
      name: "Engineering",
      description: "Handles all engineering tasks",
    },
    isActive: true,
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-01T12:00:00Z",
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    document: "321321321",
    email: "bob.brown@example.com",
    department: {
      id: 3,
      name: "Sales",
      description: "Handles all sales tasks",
    },
    isActive: false,
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-01T12:00:00Z",
  }
];

export async function createUser(data: CreateUserSchemaType) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newEmployee: User = {
    id: users.length + 1,
    firstName: data.firstName,
    lastName: data.lastName,
    document: data.document,
    email: data.email,
    department: {
      id: Number(data.departmentId),
      name: "",
    },
    isActive: data.isActive,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newEmployee);

  return newEmployee;
}

export async function fetchUsers(filters: FilterState) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return users.filter((user) => {
    const matchesSearch = filters.search ? user.firstName.toLowerCase().includes(filters.search.toLowerCase()) || user.lastName.toLowerCase().includes(filters.search.toLowerCase()) : true;
    const matchesDepartment = filters.departmentId ? user.department.id === Number(filters.departmentId) : true;
    const matchesStatus = filters.status ? user.isActive === (filters.status === "true" ? true : false) : true;

    return matchesSearch && matchesDepartment && matchesStatus;
  });
}

export async function fetchUserById(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return users.find((user) => user.id === Number(userId));
}

export async function deleteUser(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const index = users.findIndex((user) => user.id === Number(userId));
  if (index !== -1) {
    users.splice(index, 1);
  }
}
