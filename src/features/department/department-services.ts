import { Api } from './../../lib/axios';
import type { Department } from './department-types';

export async function fetchDepartments() {
  return Api.fetch<undefined, Department[]>({
    method: "GET",
    endpoint: "/departments"
  });
}
