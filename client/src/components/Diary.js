const token = localStorage.getItem("token");
const response = await fetch(`${process.env.REACT_APP_API_URL}/api/protected`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
