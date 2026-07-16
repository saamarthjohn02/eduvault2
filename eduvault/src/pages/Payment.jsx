import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getCurrentUser, getPaymentStatus, logout } from "../utils/auth";
import { payFor, PRICES } from "../utils/payment";
import paymentImg from "../assets/undraw_online-payments_d5ef.png";
import "./Payment.css";

const COPY = {
  portal: {
    title: "Unlock Portal Access",
    blurb: "A one-time fee to activate your student dashboard.",
    nextPath: "/student-dashboard",
  },
  notes: {
    title: "Unlock Notes Access",
    blurb: "A one-time fee to view and download notes from every subject.",
    nextPath: -1, // go back to wherever they came from (a subject page)
  },
};

function Payment() {
  const { purpose } = useParams(); // "portal" | "notes"
  const navigate = useNavigate();
  const user = getCurrentUser();
  const status = getPaymentStatus();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) return <Navigate to="/login" replace />;
  if (!COPY[purpose]) return <Navigate to="/" replace />;

  // Already paid? Don't make them pay again.
  const alreadyPaid = purpose === "portal" ? status.hasPortalAccess : status.hasNotesAccess;
  if (alreadyPaid) {
    return <Navigate to={purpose === "portal" ? "/student-dashboard" : -1} replace />;
  }

  const { title, blurb, nextPath } = COPY[purpose];

  const handlePay = async () => {
    setError("");
    setLoading(true);
    try {
      await payFor(purpose);
      navigate(nextPath, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="payment-page">
      <div className="payment-box">
        <img className="payment-illustration" src={paymentImg} alt="Person making a secure payment" />
        <h1>{title}</h1>
        <p className="subtitle">{blurb}</p>

        <div className="payment-card">
          <span className="price">{PRICES[purpose]}</span>
          <span className="price-note">one-time</span>

          {error && <p className="error">{error}</p>}

          <button onClick={handlePay} disabled={loading}>
            {loading ? "Opening checkout..." : `Pay ${PRICES[purpose]}`}
          </button>
        </div>

        <p className="payment-logout" onClick={handleLogout}>
          Not {user.name}? Logout
        </p>
      </div>
    </div>
  );
}

export default Payment;