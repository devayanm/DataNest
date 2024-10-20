import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const apiRequest = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    throw new Error(message);
  }
};

export const loginUser = async (credentials) => {
  return await apiRequest("post", `${API_URL}/users/login`, credentials);
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  return { message: "Logged out successfully" };
};

export const fetchUserProfile = async () => {
  return await apiRequest("get", `${API_URL}/user/profile`);
};

export const fetchUserTransactions = async () => {
  return await apiRequest("get", `${API_URL}/user/transactions`);
};

export const setUserData = async (data) => {
  return await apiRequest("put", `${API_URL}/user/profile`, data);
};

export const setUserTransactions = async (transactions) => {
  return await apiRequest("put", `${API_URL}/user/transactions`, transactions);
};

export const registerUser = async (userData) => {
  return await apiRequest("post", `${API_URL}/users/register`, userData);
};

export const resetPassword = async (email) => {
  return await apiRequest("post", `${API_URL}/users/reset-password`, { email });
};

export const verifyEmail = async (token) => {
  return await apiRequest("get", `${API_URL}/users/verify-email/${token}`);
};
