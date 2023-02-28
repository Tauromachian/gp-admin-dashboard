import qs from "query-string";

import { RequestHeader } from "@/services/requestHeader";

import appApi from "../appApi";

export async function getInstitutions(filters) {
  const stringifiedFilters = qs.stringify(filters);

  const { data } = await appApi.get(`Institution?${stringifiedFilters}`);
  return data;
}

export async function getInstitution(id) {
  const { data } = await appApi.get(`Institution/${id}/details`);
  return data;
}

export async function addInstitution(form) {
  const { data } = await appApi.post(`institution`, form);
  return data;
}

export async function updateInstitution(form) {
  const { data } = await appApi.patch(`institution`, form);
  return data;
}

export async function deleteInstitution(id) {
  const response = await appApi.delete(`Institution/${id}`);

  return response.data.name;
}
