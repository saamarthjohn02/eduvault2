import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import { addNote, SUBJECTS } from "../utils/notes";
import "./UploadNotes.css";

function UploadNotes() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Note title is required.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await addNote({
        title,
        subject,
        description,
        file,
        teacherName: user?.name,
      });
      navigate("/my-notes");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-box">
        <h1>Upload Notes</h1>

        <form onSubmit={handleSubmit}>
          <label>Note Title</label>
          <input
            type="text"
            placeholder="Enter Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Subject</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <label>Description</label>
          <textarea
            rows="5"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label>Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Uploading..." : "Upload Notes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadNotes;