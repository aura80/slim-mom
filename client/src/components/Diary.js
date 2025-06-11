const token = localStorage.getItem("token");
const response = await fetch("http://localhost:5000/api/protected", {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
