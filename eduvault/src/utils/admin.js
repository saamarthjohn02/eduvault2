import { getToken } from "./auth";

const API_URL = "http://localhost:5000/api";

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` };
}

export async function getStats() {
  const res = await fetch(`${API_URL}/admin/stats`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not load stats.");
  return data;
}

export async function getAllUsers() {
  const res = await fetch(`${API_URL}/admin/users`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not load users.");
  return data.users;
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not delete user.");
}

export async function getAllNotes() {
  const res = await fetch(`${API_URL}/admin/notes`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not load notes.");
  return data.notes;
}

export async function deleteAnyNote(id) {
  const res = await fetch(`${API_URL}/admin/notes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not delete note.");
}

export async function getAllPayments() {
  const res = await fetch(`${API_URL}/admin/payments`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not load payments.");
  return data.payments;
}

// Amount from the backend is in paise — this turns 5000 into "₹50.00"
export function formatPaise(paise) {
  return `₹${(paise / 100).toFixed(2)}`;
}