import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // ✨ اضفنا دى

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // ✨ استخدمنا useNavigate

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleIncrement = (productId) => {
    const product = cart.find((item) => item.id === productId);
    updateQuantity(productId, product.quantity + 1);
  };

  const handleDecrement = (productId) => {
    const product = cart.find((item) => item.id === productId);
    updateQuantity(productId, product.quantity - 1);
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout"); // ✨ روح على صفحة checkout
  };

  return (
    <div className="cart-page container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.name} />
              <div className="info">
                <h4>{product.name}</h4>
                <p>${product.price}</p>
              </div>

              <div className="quantity">
                <button onClick={() => handleDecrement(product.id)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleIncrement(product.id)}>+</button>
              </div>

              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${totalPrice}</h3>
          <button className="button" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
