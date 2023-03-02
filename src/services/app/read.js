import qs from "query-string";

import appApi from "../appApi";

export async function getReads(filters) {
  const stringifiedFilters = qs.stringify(filters);

  const { data } = await appApi.get(`reads?${stringifiedFilters}`);
  return data;
}

export async function getRead(id) {
  const { data } = await appApi.get(`reads/${id}`);
  return data;
}

export async function addRead(form) {
  const { data } = await appApi.post(`reads`, form);
  return data;
}

export async function updateRead(id, form) {
  const { data } = await appApi.patch(`reads/${id}`, form);
  return data;
}

export async function deleteRead(id) {
  const response = await appApi.delete(`read/${id}`);

  return response.data.name;
}
