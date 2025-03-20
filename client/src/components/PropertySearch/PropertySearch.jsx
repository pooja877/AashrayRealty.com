import { useState } from "react";
import "./PropertySearch.css";

const PropertySearch = () => {
  const [filters, setFilters] = useState({
    location: "Any Location",
    type: "Any Type",
    price: "Any Price",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  return (
    <section className="property-search">
      <div className="search-container">
        <div className="search-grid">
          <div>
            <label className="search-label">Location</label>
            <select name="location" value={filters.location} onChange={handleChange} className="search-select">
              <option>Any Location</option>
              <option>Downtown</option>
              <option>Suburban</option>
              <option>Beachfront</option>
              <option>Countryside</option>
            </select>
          </div>
          <div>
            <label className="search-label">Property Type</label>
            <select name="type" value={filters.type} onChange={handleChange} className="search-select">
              <option>Any Type</option>
              <option>Residential</option>
              <option>Apartment</option>
              <option>Commercial</option>
            </select>
          </div>
          <div>
            <label className="search-label">Price Range</label>
            <select name="price" value={filters.price} onChange={handleChange} className="search-select">
              <option>Any Price</option>
              <option>$1M - $2M</option>
              <option>$2M - $5M</option>
              <option>$5M+</option>
            </select>
          </div>
          <div className="search-button-container">
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySearch;
