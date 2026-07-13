import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotesByTeacher, deleteNote, noteFileUrl } from "../utils/notes";
import "./MyNotes.css";

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getNotesByTeacher()
      .then(setNotes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="notes-page">
      <div className="top-bar">
        <h1>My Uploaded Notes</h1>
        <Link to="/upload-notes">
          <button className="upload-btn">+ Upload Notes</button>
        </Link>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <div className="empty-notes">
          <h2>No Notes Uploaded Yet</h2>
          <p>You haven't uploaded any notes yet.</p>
          <p>
            Click the <strong>Upload Notes</strong> button above to upload
            your first note.
          </p>
        </div>
      ) : (
        <div className="notes-container">
          {notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h2>{note.title}</h2>
              <p className="note-subject">{note.subject}</p>
              {note.description && <p>{note.description}</p>}
              <div className="note-actions">
                {noteFileUrl(note) && (
                  <a href={noteFileUrl(note)} download={note.fileName} target="_blank" rel="noreferrer">
                    <button>Download</button>
                  </a>
                )}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyNotes;