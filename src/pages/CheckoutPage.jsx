import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const { cart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const handlePlaceOrder = () => {
    if (!fullName.trim() || !address.trim()) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    if (paymentMethod === "Credit Card" && (!cardNumber || !expiryDate || !cvv)) {
      toast.error("Please complete your Credit Card information.");
      return;
    }

    if (paymentMethod === "PayPal" && !paypalEmail) {
      toast.error("Please enter your PayPal Email.");
      return;
    }

    toast.success(`Order placed successfully with ${paymentMethod} 🎉`);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          <div className="checkout-summary">
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="total-price">Total: ${totalPrice.toFixed(2)}</h3>
          </div>

          <div className="checkout-form">
            <h3>Shipping Details</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <h3>Payment Method</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Cash on Delivery</option>
            </select>

            {paymentMethod === "Credit Card" && (
              <div className="payment-fields">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            )}

            {paymentMethod === "PayPal" && (
              <div className="payment-fields">
                <input
                  type="email"
                  placeholder="PayPal Email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                />
              </div>
            )}

            <div className="payment-summary">
              <p><strong>Selected Payment:</strong> {paymentMethod}</p>
              <p><strong>Amount to Pay:</strong> ${totalPrice.toFixed(2)}</p>
            </div>

            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
