import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, updateUser } from "../utils/reqres";
import "./ReqresDemo.css";

function ReqresDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    setLoading(true);
    setError("");
    getUsers(1)
      .then((data) => setUsers(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  function startEdit(user) {
    setEditingId(user.id);
    setSavedMessage("");
    setForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id) {
    setSaving(true);
    setError("");
    try {
      await updateUser(id, form);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...form } : u))
      );
      setSavedMessage(`User #${id} updated (reqres echoed the change back).`);
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="reqres-page">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <h1>Reqres API Demo</h1>
      <p className="reqres-intro">
        Live GET and PUT calls to{" "}
        <a href="https://reqres.in" target="_blank" rel="noreferrer">
          reqres.in
        </a>{" "}
        — a mock REST API. Edits are echoed back by reqres but not actually
        stored on their server, so this is just for practicing real HTTP
        request/response handling.
      </p>

      {error && <p className="error">{error}</p>}
      {savedMessage && <p className="success">{savedMessage}</p>}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <img src={user.avatar} alt={user.first_name} />

              {editingId === user.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(e) =>
                      setForm({ ...form, first_name: e.target.value })
                    }
                    placeholder="First name"
                  />
                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(e) =>
                      setForm({ ...form, last_name: e.target.value })
                    }
                    placeholder="Last name"
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                  />
                  <div className="edit-actions">
                    <button
                      className="save-btn"
                      onClick={() => saveEdit(user.id)}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save (PUT)"}
                    </button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2>
                    {user.first_name} {user.last_name}
                  </h2>
                  <p>{user.email}</p>
                  <button className="edit-btn" onClick={() => startEdit(user)}>
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReqresDemo;