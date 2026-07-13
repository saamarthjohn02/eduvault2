// Talks to the EduVault backend API instead of localStorage.

import { getToken } from "./auth";

const API_URL = "http://localhost:5000/api";
const FILES_URL = "http://localhost:5000"; // uploaded PDFs are served from here

function authHeaders() {
  return { Authorization: `Bearer ${getToken()}` };
}

// { title, subject, description, file, teacherName }
export async function addNote({ title, subject, description, file, teacherName }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("subject", subject);
  formData.append("description", description || "");
  formData.append("teacherName", teacherName || "");
  if (file) formData.append("file", file);

  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: authHeaders(), // don't set Content-Type manually for FormData
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.note;
}

export async function getNotesBySubject(subject) {
  const res = await fetch(`${API_URL}/notes/subject/${encodeURIComponent(subject)}`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not load notes.");
  return data.notes;
}

export async function getNotesByTeacher() {
  const res = await fetch(`${API_URL}/notes/mine`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not load notes.");
  return data.notes;
}

export async function deleteNote(id) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not delete note.");
}

// Builds a downloadable URL for a note's uploaded file
export function noteFileUrl(note) {
  return note.filePath ? `${FILES_URL}/uploads/${note.filePath}` : null;
}

export const SUBJECTS = [
  "Programming in C",
  "Java",
  "DBMS",
  "Web Development",
  "Computer Networks",
];