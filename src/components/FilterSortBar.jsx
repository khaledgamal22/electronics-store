import React from "react";

const FilterSortBar = ({ filterCategory, setFilterCategory, sortOrder, setSortOrder }) => {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
      <div>
        <label>Filter by Category:</label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="Smartphone">Smartphone</option>
          <option value="Laptop">Laptop</option>
        </select>
      </div>

      <div>
        <label>Sort by Price:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Default</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;
