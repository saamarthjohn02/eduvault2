import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";
import {
  getStats,
  getAllUsers,
  deleteUser,
  getAllNotes,
  deleteAnyNote,
  getAllPayments,
  formatPaise,
} from "../utils/admin";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [tab, setTab] = useState("users"); // "users" | "notes" | "payments"
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEverything = async () => {
    setLoading(true);
    setError("");
    try {
      const [statsData, usersData, notesData, paymentsData] = await Promise.all([
        getStats(),
        getAllUsers(),
        getAllNotes(),
        getAllPayments(),
      ]);
      setStats(statsData);
      setUsers(usersData);
      setNotes(notesData);
      setPayments(paymentsData);
    } catch (err) {
      setError(err.message || "Could not load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEverything();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Delete ${name}'s account? This can't be undone.`)) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteNote = async (id, title) => {
    if (!window.confirm(`Delete note "${title}"? This can't be undone.`)) return;
    try {
      await deleteAnyNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>EduVault</h2>

        <ul>
          <li
            className={tab === "users" ? "active-tab" : ""}
            onClick={() => setTab("users")}
            style={{ cursor: "pointer" }}
          >
            👥 Users
          </li>
          <li
            className={tab === "notes" ? "active-tab" : ""}
            onClick={() => setTab("notes")}
            style={{ cursor: "pointer" }}
          >
            📚 Notes
          </li>
          <li
            className={tab === "payments" ? "active-tab" : ""}
            onClick={() => setTab("payments")}
            style={{ cursor: "pointer" }}
          >
            💳 Payments
          </li>
          <li>👤 {user?.name}</li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            🚪 Logout
          </li>
        </ul>
      </aside>

      <main className="content">
        <h1>Admin Dashboard</h1>
        <p>Manage every student, teacher, note and payment across the portal.</p>

        {error && <p className="admin-error">{error}</p>}

        {stats && (
          <div className="stats">
            <div className="stat-card">
              <h2>{stats.studentCount}</h2>
              <p>Students</p>
            </div>
            <div className="stat-card">
              <h2>{stats.teacherCount}</h2>
              <p>Teachers</p>
            </div>
            <div className="stat-card">
              <h2>{stats.noteCount}</h2>
              <p>Notes</p>
            </div>
            <div className="stat-card">
              <h2>{formatPaise(stats.totalRevenue)}</h2>
              <p>Total Revenue</p>
            </div>
            <div className="stat-card">
              <h2>{stats.portalPayments}</h2>
              <p>Portal Fees Paid</p>
            </div>
            <div className="stat-card">
              <h2>{stats.notesPayments}</h2>
              <p>Notes Fees Paid</p>
            </div>
          </div>
        )}

        {loading && <p>Loading...</p>}

        {!loading && tab === "users" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Portal Paid</th>
                <th>Notes Paid</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge role-${u.role}`}>{u.role}</span>
                  </td>
                  <td>{u.hasPortalAccess ? "✅" : "—"}</td>
                  <td>{u.hasNotesAccess ? "✅" : "—"}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteUser(u._id, u.name)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6">No users yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {!loading && tab === "notes" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Uploaded By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {notes.map((n) => (
                <tr key={n._id}>
                  <td>{n.title}</td>
                  <td>{n.subject}</td>
                  <td>{n.teacherName}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteNote(n._id, n.title)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {notes.length === 0 && (
                <tr>
                  <td colSpan="4">No notes uploaded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {!loading && tab === "payments" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Purpose</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td>{p.user ? `${p.user.name} (${p.user.email})` : "Deleted user"}</td>
                  <td>{p.purpose}</td>
                  <td>{formatPaise(p.amount)}</td>
                  <td>
                    <span className={`status-badge status-${p.status}`}>{p.status}</span>
                  </td>
                  <td>{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="5">No payments yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;