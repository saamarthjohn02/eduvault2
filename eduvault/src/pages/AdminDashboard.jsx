import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome, {user?.name} 👋</h1>
      <p>Admin dashboard — user/notes/payment management coming next.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;