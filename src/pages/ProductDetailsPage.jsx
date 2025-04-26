import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../data/products";
import { useCart } from "../context/CartContext";
import "../styles/ProductDetails.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  
  const [mainImage, setMainImage] = useState(product?.image);

  if (!product) return <p>Product not found</p>;

  const imagesToShow = product.additionalImages && product.additionalImages.length > 0
    ? product.additionalImages
    : Array(5).fill(product.image); 

  return (
    <div className="product-details-container">
      <Link to="/" className="back-link">← Back to Products</Link>

      <div className="product-details-header">
        <h1>{product.name}</h1>
        <img
  key={mainImage} 
  src={mainImage}
  alt={product.name}
  className="product-image fade-in"
/>
      </div>

      <div className="additional-images">
        <div className="additional-images-container">
        {imagesToShow.map((image, index) => (
  <img
    key={index}
    src={image}
    alt={`Product thumbnail ${index + 1}`}
    className={`additional-image ${mainImage === image ? "active" : ""}`}
    onClick={() => setMainImage(image)}
  />
))}

        </div>
      </div>

      <p className="product-desc">{product.description}</p>

      <div className="product-info">
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Rating:</strong> {product.rating} ⭐</p>
      </div>

      <h3>Specifications:</h3>
      <ul>
        <li><strong>Screen:</strong> {product.specs.screen}</li>
        <li><strong>Processor:</strong> {product.specs.processor}</li>
        <li><strong>Storage:</strong> {product.specs.storage}</li>
      </ul>

      <h3>Reviews:</h3>
      {product.reviews && product.reviews.length > 0 ? (
        <ul>
          {product.reviews.map((review, index) => (
            <li key={index} className="review-item">
              <strong>{review.username}</strong> - {review.rating} ⭐
              <br />
              <span>{review.comment}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}

      <button
        onClick={() => addToCart(product)}
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailsPage;
