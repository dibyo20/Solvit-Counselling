import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context";
import { register as registerApi, login as loginApi, logout as logoutApi } from "../services/auth.service";

export const useAuth = () => {
  const { user, setUser, authLoading, setAuthLoading } = useAppContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerUser = async (fullname, username, email, password) => {
    setAuthLoading(true);
    setError("");
    try {
      const response = await registerApi(fullname, username, email, password);
      setUser(response.user);
      navigate("/");
      return response.user;
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed. Please try again.");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const loginUser = async (loginCredential, password) => {
    setAuthLoading(true);
    setError("");
    try {
      const response = await loginApi(loginCredential, password);
      setUser(response.user);
      navigate("/");
      return response.user;
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed. Invalid credentials.");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logoutUser = async () => {
    setAuthLoading(true);
    setError("");
    try {
      await logoutApi();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "Logout failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  return {
    user,
    authLoading,
    error,
    setError,
    registerUser,
    loginUser,
    logoutUser,
  };
};
