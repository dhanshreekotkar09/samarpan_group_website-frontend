import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  if (config.url?.includes("/auth/login")) return config;
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function getImageSrc(url) {
  if (!url) return "";
  if (typeof url !== "string") return url;
  if (url.startsWith("http") || url.startsWith("blob:") || url.startsWith("data:")) return url;
  // Vite bundled frontend assets — keep as-is (served by Vite, not backend)
  if (url.startsWith("/assets/") || url.startsWith("/src/")) return url;
  // Backend uploaded images
  const base = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";
  if (url.startsWith("/uploads/")) return `${base}${url}`;
  if (url.startsWith("/")) return url;
  return `${base}/${url}`;
}

// Auth
export const login = (username, password) => api.post("/auth/login", { username, password });
export const verifyToken = () => api.get("/auth/verify");

// Projects (public)
export const getProjects = () => api.get("/projects");
export const getProject = (id) => api.get(`/projects/${id}`);

// Projects (admin)
export const getAllProjects = () => api.get("/projects/admin/all");
export const getAdminProject = (id) => api.get(`/projects/admin/${id}`);
export const createProject = (data) => api.post("/projects", data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const uploadHeroImage = (id, file) => {
  const form = new FormData();
  form.append("image", file);
  return api.post(`/projects/${id}/hero-image`, form);
};
export const uploadMediaImages = (id, files) => {
  const form = new FormData();
  files.forEach((f) => form.append("images", f));
  return api.post(`/projects/${id}/media`, form, { timeout: 600000 });
};
export const deleteMediaImage = (projectId, imageId) =>
  api.delete(`/projects/${projectId}/media/${imageId}`);
export const updateMediaImage = (projectId, imageId, data) =>
  api.patch(`/projects/${projectId}/media/${imageId}`, data);
export const addBeforeAfter = (projectId, label, beforeFile, afterFile) => {
  const form = new FormData();
  form.append("label", label);
  if (beforeFile) form.append("before", beforeFile);
  if (afterFile) form.append("after", afterFile);
  return api.post(`/projects/${projectId}/before-after`, form);
};
export const uploadBeforeAfterSide = (projectId, index, side, file) => {
  const form = new FormData();
  form.append("image", file);
  return api.post(`/projects/${projectId}/before-after/${index}/${side}`, form);
};
export const deleteBeforeAfter = (projectId, index) =>
  api.delete(`/projects/${projectId}/before-after/${index}`);

export default api;
