// import { apiUrl } from '../config';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const API_LOGIN_URL = `${apiUrl}/api/auth`;

export async function loginUser({ email, password }) {
  console.log("API URL from api.js:", process.env.REACT_APP_API_URL);
  
    const response = await fetch(`${API_LOGIN_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Login failed')

    return response.json();
}

export async function registerUser({ name, email, password }) {
  const response = await fetch(`${API_LOGIN_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) throw new Error("Register failed");

  return response.json();
}

export async function logoutUser() {
  localStorage.removeItem("token");
}
