const BASE_URL = "https://reqres.in/api";
const API_KEY = import.meta.env.VITE_REQRES_API_KEY;

function headers() {
  return {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };
}

export async function getUsers(page = 1) {
  const res = await fetch(`${BASE_URL}/users?page=${page}`, {
    headers: headers(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Could not load users from reqres.");
  }

  return data;
}

export async function updateUser(id, { first_name, last_name, email }) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({ first_name, last_name, email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Could not update user.");
  }

  return data;
}