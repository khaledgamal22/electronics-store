import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { cart, addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const found = cart.find((item) => item.id === product.id);
    if (found) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cart, product.id]);

  const handleAddToCart = (e) => {
    e.preventDefault(); // عشان الضغط على الزرار ما يفتحش الـ Link
    if (!isAdded) {
      addToCart(product);
      toast.success("Product added to cart!");
      setIsAdded(true);
    }
  };

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">
          {product.description.length > 100
            ? product.description.substring(0, 100) + "..."
            : product.description}
        </p>
        <p className="product-price"><strong>${product.price}</strong></p>
        <button
          className={`button ${isAdded ? 'added' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdded} // يمنع الضغط تاني لو المنتج أضُيف
        >
          {isAdded ? "✅ Added to Cart" : "🛒 Add to Cart"}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
