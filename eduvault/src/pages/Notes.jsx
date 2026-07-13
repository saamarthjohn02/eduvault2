import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNotesBySubject, noteFileUrl } from "../utils/notes";
import "./Notes.css";

function Notes() {
  const { subject } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getNotesBySubject(subject)
      .then(setNotes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [subject]);

  return (
    <div className="notes-page">
      <Link to="/student-dashboard" className="back-link">
        ← Back to Dashboard
      </Link>

      <h1>{subject}</h1>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p className="no-notes">No notes uploaded for this subject yet.</p>
      ) : (
        <div className="notes-container">
          {notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h2>{note.title}</h2>
              {note.description && <p>{note.description}</p>}
              <p className="note-teacher">By {note.teacherName}</p>
              {noteFileUrl(note) ? (
                <a href={noteFileUrl(note)} download={note.fileName} target="_blank" rel="noreferrer">
                  <button>Download PDF</button>
                </a>
              ) : (
                <button disabled>No file attached</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;