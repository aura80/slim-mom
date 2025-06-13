import { apiUrl } from "../config";

const token = localStorage.getItem("token");
const response = await fetch(`${apiUrl}/api/protected`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
