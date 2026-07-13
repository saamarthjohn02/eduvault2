// Talks to the EduVault backend API instead of localStorage.
// Same function names/shapes as before, so nothing in the pages changes.

const API_URL = "http://localhost:5000/api";
const TOKEN_KEY = "eduvault_token";
const USER_KEY = "eduvault_user";

export async function registerUser({ role, ...fields }) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, ...fields }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, error: data.error || "Registration failed." };
    }

    return { ok: true, user: data.user };
  } catch {
    return { ok: false, error: "Could not reach the server. Is the backend running?" };
  }
}

export async function loginUser({ email, password, role }) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, error: data.error || "Login failed." };
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));

    return { ok: true, user: data.user };
  } catch {
    return { ok: false, error: "Could not reach the server. Is the backend running?" };
  }
}

// Synchronous, reads the last-known user from localStorage.
// (Pages call this directly without awaiting, so we keep it sync.)
export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}