import React, { useState } from "react";
import productsData from "../data/products";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const allCategories = ["All", ...new Set(productsData.map((p) => p.category))];

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // New state for sorting

  const filteredProducts = productsData
    .filter((product) => {
      const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchPrice = product.price <= maxPrice;
      const matchSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchPrice && matchSearchTerm;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.price - b.price;
      } else if (sortOrder === "highToLow") {
        return b.price - a.price;
      }
      return 0; // No sorting
    });

  return (
    <div className="container">
      <div className="top-bar">
      <h1 className="page-header">Electronics Store</h1>
        <div className="nav-links">
          <Link to="/cart">🛒 Cart</Link>
          <Link to="/compare">🔍 Compare</Link>
        </div>
      </div>



      <div className="filters-wrapper">
  <div className="filter-group">
    <label>Category:</label>
    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
      {allCategories.map((cat, idx) => (
        <option key={idx} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>

  <div className="filter-group">
    <label>Max Price:</label>
    <input
      type="range"
      min="0"
      max="2000"
      step="100"
      value={maxPrice}
      onChange={(e) => setMaxPrice(Number(e.target.value))}
    />
    <span>${maxPrice}</span>
  </div>

  <div className="filter-group">
    <label>Sort by Price:</label>
    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
      <option value="">Default</option>
      <option value="lowToHigh">Low to High</option>
      <option value="highToLow">High to Low</option>
    </select>
  </div>
</div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
