import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (fullname, username, email, password) => {
  try {
    const response = await api.post("/register", {
      fullname,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during registration" };
  }
};

export const login = async (loginCredential, password) => {
  try {
    const trimmedCredential = loginCredential?.trim() || "";
    const payload = {
      password,
      ...(trimmedCredential.includes("@")
        ? { email: trimmedCredential }
        : { username: trimmedCredential }),
    };

    const response = await api.post("/login", payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during login" };
  }
};

export const logout = async () => {
  try {
    const response = await api.get("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during logout" };
  }
};
