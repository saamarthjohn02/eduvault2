import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../utils/auth";
import "./TeacherRegister.css";

function TeacherRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      department.trim() === "" ||
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

    const result =  await registerUser({
      role: "teacher",
      name,
      email,
      department,
      password,
    });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    navigate("/teacher-login");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Teacher Registration</h1>

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
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
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
          <Link to="/teacher-login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default TeacherRegister;
