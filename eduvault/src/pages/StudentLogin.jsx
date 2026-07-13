import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../utils/auth";
import "./StudentLogin.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

   const result = await loginUser({ email, password, role: "student" });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError("");
    navigate("/student-dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Student Login</h1>
        <p>Login to access your notes and subjects.</p>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        <p className="register-text">
          Don't have an account?
          <Link to="/student-register"> Register</Link>
        </p>

        <Link className="back-btn" to="/login">
          ← Back
        </Link>
      </div>
    </div>
  );
}

export default StudentLogin;
