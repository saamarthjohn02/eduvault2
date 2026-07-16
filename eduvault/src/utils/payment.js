import { getToken, getCurrentUser, refreshPaymentStatus } from "./auth";

const API_URL = "http://localhost:5000/api";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// Asks the backend to create a Razorpay order for the given purpose.
async function createOrder(purpose) {
  const res = await fetch(`${API_URL}/payment/create-order`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ purpose }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not start payment.");
  return data; // { orderId, amount, currency, keyId }
}

// Sends the payment result to the backend so it can verify the signature
// and (if valid) unlock the relevant access flag.
async function verifyPayment({ orderId, paymentId, signature, purpose }) {
  const res = await fetch(`${API_URL}/payment/verify`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      purpose,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Payment verification failed.");
  return data;
}

// Opens the Razorpay checkout popup for the given purpose ("portal" | "notes").
// Returns a promise that resolves once payment is created AND verified,
// or rejects if the user cancels or something fails.
export function payFor(purpose) {
  return new Promise(async (resolve, reject) => {
    if (!window.Razorpay) {
      return reject(new Error("Payment SDK didn't load. Check your internet connection."));
    }

    let order;
    try {
      order = await createOrder(purpose);
    } catch (err) {
      return reject(err);
    }

    const user = getCurrentUser();
    const label = purpose === "portal" ? "EduVault Portal Access" : "EduVault Notes Access";

    const razorpay = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: "EduVault",
      description: label,
      prefill: { name: user?.name, email: user?.email },
      theme: { color: "#4f46e5" },
      handler: async (response) => {
        try {
          await verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            purpose,
          });
          await refreshPaymentStatus(); // update cached status so ProtectedRoute sees it
          resolve();
        } catch (err) {
          reject(err);
        }
      },
      modal: {
        ondismiss: () => reject(new Error("Payment was cancelled.")),
      },
    });

    razorpay.on("payment.failed", () => reject(new Error("Payment failed. Please try again.")));
    razorpay.open();
  });
}

export const PRICES = {
  portal: "₹50",
  notes: "₹100",
};