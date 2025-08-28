import { Api } from "@/lib/axios";
import type { Department } from "./department.model";

const departments: Department[] = [
  {
    id: 1,
    name: "Engineering",
    description: "Handles all engineering tasks",
  },
  {
    id: 2,
    name: "Marketing",
    description: "Handles all marketing tasks",
  },
  {
    id: 3,
    name: "Sales",
    description: "Handles all sales tasks",
  },
];

export async function fetchDepartments() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return departments;
}
