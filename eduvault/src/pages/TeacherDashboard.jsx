import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";
import { getNotesByTeacher, SUBJECTS } from "../utils/notes";
import bannerImg from "../assets/undraw_teacher_n0ow.png";
import "./TeacherDashboard.css";

function TeacherDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    getNotesByTeacher()
      .then((notes) => setNoteCount(notes.length))
      .catch(() => setNoteCount(0));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>EduVault</h2>

        <ul>
          <li>🏠 Dashboard</li>
          <li>
            <Link to="/upload-notes">📤 Upload Notes</Link>
          </li>
          <li>
            <Link to="/my-notes" className="nav-link">
              📚 My Notes
            </Link>
          </li>
          <li>👤 {user?.name}</li>
          <li>
            <Link to="/reqres-demo">🔗 Reqres Demo</Link>
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            🚪 Logout
          </li>
        </ul>
      </aside>

      <main className="content">
        <div className="content-header">
          <div>
            <h1>Welcome {user?.name} 👋</h1>
            <p>Manage your study material and upload notes for students.</p>
          </div>
          <img className="banner-img" src={bannerImg} alt="Teacher sharing documents" />
        </div>

        <div className="stats">
          <div className="stat-card">
            <h2>{SUBJECTS.length}</h2>
            <p>Subjects</p>
          </div>

          <div className="stat-card">
            <h2>{noteCount}</h2>
            <p>Uploaded Notes</p>
          </div>
        </div>

        <h2 className="heading">Subjects</h2>

        <div className="subjects">
          {SUBJECTS.map((subject) => (
            <div key={subject} className="subject-card">
              <span className="catalog-tag">
                {subject
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 3)
                  .toUpperCase()}
              </span>
              {subject}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TeacherDashboard;