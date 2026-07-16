import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="login-page">

      <div className="login-box">

        <h1>EduVault</h1>

        <p className="subtitle">
          Choose your login portal
        </p>

        
        <div className="cards">

          
          <div className="card">

            <h2>🎓 Student</h2>

            <p>
              Access your subjects, notes and downloads.
            </p>

            <Link to="/student-login">
              <button>Student Login</button>
            </Link>

            <p className="register-link">
              Don't have an account?
              <Link to="/student-register"> Register</Link>
            </p>

          </div>

          
          <div className="card">

            <h2>👨‍🏫 Teacher</h2>

            <p>
              Upload notes and manage your subjects.
            </p>

            <Link to="/teacher-login">
              <button>Teacher Login</button>
            </Link>

            <p className="register-link">
              Don't have an account?
              <Link to="/teacher-register"> Register</Link>
            </p>

          </div>

          <div className="card">

            <h2>🛡️ Admin</h2>

            <p>
              Manage users, notes and payments across the portal.
            </p>

            <Link to="/admin-login">
              <button>Admin Login</button>
            </Link>

            <p className="register-link">
              Don't have an account?
              <Link to="/admin-register"> Register</Link>
            </p>

          </div>

        </div>

        <Link className="back-home" to="/">
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Login;