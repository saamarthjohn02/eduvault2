import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <>
      <header className="navbar">

        <h2>EduVault</h2>

        <nav>

          <a href="#home">Home</a>

          <a href="#about">About</a>

          <a href="#contact">Contact</a>

          <Link className="login-btn" to="/login">
            Login
          </Link>

        </nav>

      </header>

      <section id="home" className="hero">

        <h1>Student Learning Portal</h1>

        <p>
          Access all your subject notes uploaded by your teachers anytime,
          anywhere.
        </p>

        <Link to="/login">
          <button className="hero-btn">
            Get Started
          </button>
        </Link>

      </section>

      <section className="features">

        <h2>Why Choose EduVault?</h2>

        <div className="cards">

          <div className="card">
            <h3>📚 Subject Notes</h3>
            <p>Access all notes uploaded by your teachers.</p>
          </div>

          <div className="card">
            <h3>👨‍🏫 Teacher Uploads</h3>
            <p>Teachers can upload and manage notes easily.</p>
          </div>

          <div className="card">
            <h3>⚡ Fast Access</h3>
            <p>Quick and secure downloads.</p>
          </div>

          <div className="card">
            <h3>🔒 Secure Login</h3>
            <p>Separate login portals for teachers and students.</p>
          </div>

        </div>

      </section>

      <section className="subjects">

        <div className="subjects-container">

          <h2>Subjects</h2>

          <div className="subject-list">

            <div>Programming in C</div>

            <div>Java</div>

            <div>DBMS</div>

            <div>Web Development</div>

            <div>Computer Networks</div>

          </div>

        </div>

      </section>

      <section className="steps">

        <h2>How It Works</h2>

        <div className="step-box">

          <div>1. Login</div>

          <div>2. Choose Subject</div>

          <div>3. View Notes</div>

          <div>4. Download Notes</div>

        </div>

      </section>

      <section id="about" className="about">

        <h2>About EduVault</h2>

        <p className="about-text">
          EduVault is a MERN Stack Student Portal designed to make sharing
          study material between teachers and students simple, secure and
          organized.
        </p>

        <div className="about-cards">

          <div className="about-card">

            <h3>👨‍🏫 Teachers</h3>

            <p>
              Upload, edit and delete notes for every subject.
            </p>

          </div>

          <div className="about-card">

            <h3>🎓 Students</h3>

            <p>
              Access and download notes uploaded by teachers.
            </p>

          </div>

          <div className="about-card">

            <h3>🔒 Secure Portal</h3>

            <p>
              Separate login portals keep teacher and student data secure.
            </p>

          </div>

        </div>

      </section>

      <section id="contact" className="contact">

        <h2>Contact Us</h2>

        <p>Email : support@eduvault.com</p>

        <p>Phone : +91 9876543210</p>

        <p>Location : New Delhi, India</p>

      </section>

      <footer>

        <p>© 2026 EduVault Student Portal</p>

      </footer>

    </>
  );
}

export default LandingPage;