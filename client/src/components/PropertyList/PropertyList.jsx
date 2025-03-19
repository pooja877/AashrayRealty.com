import "./PropertyList.css";

const properties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tag: "FEATURED",
    tagClass: "bg-housing-green",
    title: "Luxury Apartment",
    price: "₹1.2 Cr",
    pricePerSqft: "₹7,500/sq.ft",
    location: "Bandra West, Mumbai",
    type: "REN & REI",
    bedrooms: "3 BHK",
    size: "1800 sq.ft",
    status: "Ready to Move",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Modern Villa",
    price: "₹2.5 Cr",
    pricePerSqft: "₹10,000/sq.ft",
    location: "Whitefield, Bangalore",
    type: "CANVAS & COVE",
    bedrooms: "4 BHK",
    size: "2500 sq.ft",
    status: "Under Construction",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tag: "NEW LAUNCH",
    tagClass: "bg-yellow-500",
    title: "Premium Penthouse",
    price: "₹4.8 Cr",
    pricePerSqft: "₹15,000/sq.ft",
    location: "Jubilee Hills, Hyderabad",
    type: "ASSETZ 66 & SHIBUI",
    bedrooms: "5 BHK",
    size: "3200 sq.ft",
    status: "Ready to Move",
  },
];

const PropertyList = () => {
  return (
    <section className="top-picks">
      <div className="container">
        <div className="top-picks-header">
          <div>
            <h2 className="top-picks-title">Aashray top picks</h2>
            <p className="top-picks-subtitle">Explore top living options with us</p>
          </div>
          <div className="top-picks-buttons">
            <button className="nav-button" id="prevProperty">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="nav-button" id="nextProperty">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="property-container">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                <img src={property.image} alt={property.title} />
                {property.tag && <span className={`property-tag ${property.tagClass}`}>{property.tag}</span>}
                <button className="favorite-button">
                  <i className="far fa-heart"></i>
                </button>
              </div>
              <div className="propertyproinfo">
                <div className="property-header">
                  <div>
                    <span className="property-type">{property.type}</span>
                    <h3 className="property-title">{property.title}</h3>
                  </div>
                  <div className="propertyproprice">
                    <p className="pricepro">{property.price}</p>
                    <p className="price-per-sqft">{property.pricePerSqft}</p>
                  </div>
                </div>
                <p className="property-location">{property.location}</p>
                <div className="property-details">
                  <span><i className="fas fa-bed"></i> {property.bedrooms}</span>
                  <span><i className="fas fa-vector-square"></i> {property.size}</span>
                  <span><i className="fas fa-building"></i> {property.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyList;
