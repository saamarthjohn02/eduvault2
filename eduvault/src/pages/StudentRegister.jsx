import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../utils/auth";
import "./StudentRegister.css";

function StudentRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      course.trim() === "" ||
      semester.trim() === "" ||
      password.trim() === ""
    ) {
      setError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const result = await registerUser({
      role: "student",
      name,
      email,
      course,
      semester,
      password,
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate("/student-login");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Student Registration</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={handleRegister}>Register</button>

        <p>
          Already have an account?
          <Link to="/student-login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default StudentRegister;
