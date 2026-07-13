import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

// Wrap any route element with this to require login (and optionally a role).
// Usage: <ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>
function ProtectedRoute({ role, children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // e.g. a student trying to open a teacher-only page
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
