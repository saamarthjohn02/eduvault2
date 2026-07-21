import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getCurrentUser, getPaymentStatus, logout } from "../utils/auth";
import { payFor, downloadInvoice, PRICES } from "../utils/payment";
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
    nextPath: -1,
  },
};

function Payment() {
  const { purpose } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const status = getPaymentStatus();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paidPaymentId, setPaidPaymentId] = useState(null);
  const [downloading, setDownloading] = useState(false);

  if (!user) return <Navigate to="/login" replace />;
  if (!COPY[purpose]) return <Navigate to="/" replace />;

  const alreadyPaid = purpose === "portal" ? status.hasPortalAccess : status.hasNotesAccess;
  if (alreadyPaid && !paidPaymentId) {
    return <Navigate to={purpose === "portal" ? "/student-dashboard" : -1} replace />;
  }

  const { title, blurb, nextPath } = COPY[purpose];

  const handlePay = async () => {
    setError("");
    setLoading(true);
    try {
      const paymentId = await payFor(purpose);
      setPaidPaymentId(paymentId);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadInvoice(paidPaymentId);
    } catch (err) {
      setError(err.message || "Could not download invoice.");
    } finally {
      setDownloading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (paidPaymentId) {
    return (
      <div className="payment-page">
        <div className="payment-box">
          <h1>Payment Successful 🎉</h1>
          <p className="subtitle">Your {purpose === "portal" ? "portal" : "notes"} access is now unlocked.</p>

          <div className="payment-card">
            <span className="price">{PRICES[purpose]}</span>
            <span className="price-note">paid</span>

            {error && <p className="error">{error}</p>}

            <button onClick={handleDownload} disabled={downloading}>
              {downloading ? "Preparing invoice..." : "📄 Download Invoice"}
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate(nextPath, { replace: true })}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

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