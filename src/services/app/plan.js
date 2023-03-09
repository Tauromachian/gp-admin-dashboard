import qs from "query-string";

import appApi from "../appApi";

export async function getPlans(filters) {
  const stringifiedFilters = qs.stringify(filters);

  const { data } = await appApi.get(`plans?${stringifiedFilters}`);
  return data;
}

export async function getPlan(id) {
  const { data } = await appApi.get(`plans/${id}`);
  return data;
}

export async function addPlan(form) {
  const { data } = await appApi.post(`plans`, form);
  return data;
}

export async function updatePlan(id, form) {
  const { data } = await appApi.patch(`plans/${id}`, form);
  return data;
}

export async function deletePlan(id) {
  const response = await appApi.delete(`plan/${id}`);

  return response.data.name;
}
