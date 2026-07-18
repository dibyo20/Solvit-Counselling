import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: `${API_URL}/counsellors`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCounsellors = async (search = "", specialization = "", sortBy = "") => {
  try {
    const params = {};
    if (search && search.trim()) {
      params.search = search.trim();
    }
    if (specialization && specialization !== "All") {
      params.specialization = specialization;
    }
    if (sortBy && sortBy !== "Recommended") {
      params.sortBy = sortBy;
    }
    const response = await api.get("/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch counsellors" };
  }
};
