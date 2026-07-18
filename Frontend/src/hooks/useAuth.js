import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context";
import { register, login, logout } from "../services/auth.service";

export const useAuth = () => {
  const context = useContext(AppContext);
  const { user, setUser, authLoading, setAuthLoading } = context;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerUser = async (fullname, username, email, password) => {
    setAuthLoading(true);
    setError("");
    try {
      const response = await register(fullname, username, email, password);
      console.log(response);
      setUser(response.user);
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
      const response = await login(loginCredential, password);
      setUser(response.user);
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
      await logout();
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
