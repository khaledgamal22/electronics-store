import React, { useState } from "react";
import productsData from "../data/products";
import "../styles/ComparePage.css";

const ComparePage = () => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (product) => {
    if (compareList.length < 2 && !compareList.includes(product)) {
      setCompareList([...compareList, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setCompareList(compareList.filter(item => item.id !== productId));
  };

  // تحديد أرخص منتج
  const cheapestProductId = compareList.length > 0
    ? compareList.reduce((minProduct, currentProduct) => 
        currentProduct.price < minProduct.price ? currentProduct : minProduct
      ).id
    : null;

  return (
    <div className="compare-page">
      <h2>Compare Products</h2>

      {compareList.length === 0 ? (
        <p>Select products to compare.</p>
      ) : (
        <div className="compare-products">
          {compareList.map((product) => (
            <div
              key={product.id}
              className={`compare-product ${product.id === cheapestProductId ? "highlight" : ""}`}
            >
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Rating:</strong> {product.rating} ⭐</p>
              <div className="specifications">
                <p><strong>Screen:</strong> {product.specs.screen}</p>
                <p><strong>Processor:</strong> {product.specs.processor}</p>
                <p><strong>Storage:</strong> {product.specs.storage}</p>
              </div>
              <button onClick={() => removeFromCompare(product.id)} className="remove-button">
                Remove from Comparison
              </button>
            </div>
          ))}
        </div>
      )}

      <h3>Select Products to Compare</h3>

      <div className="product-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button
              className="button"
              onClick={() => addToCompare(product)}
              disabled={compareList.includes(product)}
            >
              {compareList.includes(product) ? "Added" : "Add to Compare"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePage;
