import { Navigate } from "react-router-dom";
import { getCurrentUser, getPaymentStatus } from "../utils/auth";

// Wrap any route element with this to require login (and optionally a role
// and/or a payment). Payment checks are skipped for teachers — they're
// never charged.
// Usage:
//   <ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>
//   <ProtectedRoute role="student" requirePayment="portal"><StudentDashboard /></ProtectedRoute>
//   <ProtectedRoute role="student" requirePayment="notes"><Notes /></ProtectedRoute>
function ProtectedRoute({ role, requirePayment, children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // e.g. a student trying to open a teacher-only page
    return <Navigate to="/" replace />;
  }

  if (requirePayment && user.role !== "teacher") {
    const status = getPaymentStatus();
    const paid = requirePayment === "portal" ? status.hasPortalAccess : status.hasNotesAccess;

    // Notes access is meaningless without portal access first, so always
    // send unpaid users through the portal fee before the notes fee.
    if (!status.hasPortalAccess) {
      return <Navigate to="/payment/portal" replace />;
    }
    if (!paid) {
      return <Navigate to={`/payment/${requirePayment}`} replace />;
    }
  }

  return children;
}

export default ProtectedRoute;