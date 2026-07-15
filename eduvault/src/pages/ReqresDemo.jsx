import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, updateUser, createUser } from "../utils/reqres";
import "./ReqresDemo.css";

function ReqresDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState({ first_name: "", last_name: "", email: "" });
  const [creating, setCreating] = useState(false);

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

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    setError("");
    try {
      const newUser = await createUser(createForm);
      setUsers((prev) => [
        {
          id: newUser.id,
          first_name: createForm.first_name,
          last_name: createForm.last_name,
          email: createForm.email,
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
        ...prev,
      ]);
      setSavedMessage(`New user #${newUser.id} created (reqres echoed the record back).`);
      setCreateForm({ first_name: "", last_name: "", email: "" });
      setShowCreateForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="reqres-page">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <h1>The Telegraph Desk</h1>
      <p className="reqres-intro">
        A live wire out to{" "}
        <a href="https://reqres.in" target="_blank" rel="noreferrer">
          reqres.in
        </a>{" "}
        — records fetched and dispatched over a real GET and PUT exchange.
        Edits are echoed back but not stored on their end, so this desk is
        purely for practicing genuine request/response handling.
      </p>

      {error && <p className="error">{error}</p>}
      {savedMessage && <p className="success">{savedMessage}</p>}

      <div className="create-bar">
        <button
          className="edit-btn"
          onClick={() => setShowCreateForm((v) => !v)}
        >
          {showCreateForm ? "Cancel" : "+ Add New User (POST)"}
        </button>
      </div>

      {showCreateForm && (
        <form className="create-user-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="First name"
            value={createForm.first_name}
            onChange={(e) =>
              setCreateForm({ ...createForm, first_name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Last name"
            value={createForm.last_name}
            onChange={(e) =>
              setCreateForm({ ...createForm, last_name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={createForm.email}
            onChange={(e) =>
              setCreateForm({ ...createForm, email: e.target.value })
            }
            required
          />
          <button className="save-btn" type="submit" disabled={creating}>
            {creating ? "Creating..." : "Create (POST)"}
          </button>
        </form>
      )}

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