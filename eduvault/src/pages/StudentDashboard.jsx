import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";
import { SUBJECTS } from "../utils/notes";
import bannerImg from "../assets/undraw_learning-to-sketch_uaxi.png";
import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();

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
            <p>Select a subject to view available notes.</p>
          </div>
          <img className="banner-img" src={bannerImg} alt="Student taking notes" />
        </div>

        <div className="subjects">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject}
              to={`/notes/${encodeURIComponent(subject)}`}
              className="subject-card"
            >
              <span className="catalog-tag">
                {subject
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 3)
                  .toUpperCase()}
              </span>
              {subject}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;