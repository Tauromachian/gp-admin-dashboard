import qs from "query-string";

import appApi from "../appApi";

export async function getInstitutions(filters) {
  const stringifiedFilters = qs.stringify(filters);

  const { data } = await appApi.get(`institutions?${stringifiedFilters}`);
  return data;
}

export async function getInstitution(id) {
  const { data } = await appApi.get(`institutions/${id}/details`);
  return data;
}

export async function addInstitution(form) {
  const { data } = await appApi.post(`institutions`, form);
  return data;
}

export async function updateInstitution(id, form) {
  const { data } = await appApi.patch(`institutions/${id}`, form);
  return data;
}

export async function deleteInstitution(id) {
  const response = await appApi.delete(`institution/${id}`);

  return response.data.name;
}
