import axios from "axios";

const api = axios.create({
  baseURL: "https://frontend-take-home-service.fetch.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function loginUser({ name, email }) {
  const response = await api.post("/auth/login", { name, email });
  return response.data;
}

export async function logoutUser() {
  await api.post("/auth/logout");
}

export async function getAllBreeds() {
  const response = await api.get("/dogs/breeds");
  return response.data;
}

export async function searchDogs({
  breeds = [],
  zipCodes = [],
  ageMin,
  ageMax,
  sort,
  size = 10,
  from = 0,
}) {
  const params = new URLSearchParams();
  breeds.forEach((b) => params.append("breeds", b));
  zipCodes.forEach((z) => params.append("zipCodes", z));
  if (ageMin != null) params.append("ageMin", ageMin);
  if (ageMax != null) params.append("ageMax", ageMax);
  if (sort) params.append("sort", sort);
  if (size) params.append("size", size);
  if (from) params.append("from", from);
  const response = await api.get(`/dogs/search?${params.toString()}`);
  return response.data;
}

export async function getDogsByIds(dogIds = []) {
  if (!dogIds.length) return [];
  const response = await api.post("/dogs", dogIds);
  return response.data;
}

export async function getMatch(dogIds = []) {
  if (!dogIds.length) return null;
  const response = await api.post("/dogs/match", dogIds);
  return response.data;
}

export async function getLocationsByZipCodes(zipCodes = []) {
  if (!zipCodes.length) return [];
  const response = await api.post("/locations", zipCodes);
  return response.data;
}

export async function searchLocations(params = {}) {
  const response = await api.post("/locations/search", params);
  return response.data;
}

export default api;
