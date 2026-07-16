import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import StudentRegister from "./pages/StudentRegister";
import TeacherRegister from "./pages/TeacherRegister";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import UploadNotes from "./pages/UploadNotes";
import Notes from "./pages/Notes";
import MyNotes from "./pages/MyNotes";
import ReqresDemo from "./pages/ReqresDemo";
import Payment from "./pages/Payment";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment/:purpose"
          element={
            <ProtectedRoute role="student">
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student" requirePayment="portal">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-notes"
          element={
            <ProtectedRoute role="teacher">
              <UploadNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-notes"
          element={
            <ProtectedRoute role="teacher">
              <MyNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:subject"
          element={
            <ProtectedRoute role="student" requirePayment="notes">
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reqres-demo"
          element={
            <ProtectedRoute>
              <ReqresDemo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;