import qs from "query-string";

import appApi from "../appApi";

export async function getServices(filters) {
  const stringifiedFilters = qs.stringify(filters);

  const { data } = await appApi.get(`services?${stringifiedFilters}`);
  return data;
}

export async function getService(id) {
  const { data } = await appApi.get(`services/${id}`);
  return data;
}

export async function addService(form) {
  const { data } = await appApi.post(`services`, form);
  return data;
}

export async function updateService(id, form) {
  const { data } = await appApi.patch(`services/${id}`, form);
  return data;
}

export async function deleteService(id) {
  const response = await appApi.delete(`service/${id}`);

  return response.data.name;
}

export async function addServiceCredentials(id, form) {
  const { data } = await appApi.post(`service/${id}/user`, form);
  return data;
}

export async function updateServiceCredentials(id, form) {
  const { data } = await appApi.post(`service/${id}/user`, form);
  return data;
}
