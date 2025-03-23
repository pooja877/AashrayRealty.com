import "./PropertyList.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const propertiesPerPage = 3; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/api/property/top-rated");
        setProperties(res.data); // ✅ 3+ rating wali properties set kar raha hoon
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };

    fetchProperties();
  }, []);

  const [likedProperties, setLikedProperties] = useState(() => {
    const savedLikes = localStorage.getItem('likedProperties');
    return savedLikes ? JSON.parse(savedLikes) : {}; // Default to empty object if no data
  });

  // ✅ Ek time pe sirf 3 properties dikhani hain
  const visibleProperties =properties.slice(startIndex, startIndex + propertiesPerPage);
  const handleNext = () => {
    if (startIndex + propertiesPerPage < properties.length) {
        setStartIndex(startIndex + 1);
    }
};

// Handle Previous Slide
const handlePrevious = () => {
    if (startIndex > 0) {
        setStartIndex(startIndex - 1);
    }
};
  const toggleLike = (propertyId) => {
    setLikedProperties(prevState => {
      const updatedLikes = { ...prevState, [propertyId]: !prevState[propertyId] };
      localStorage.setItem('likedProperties', JSON.stringify(updatedLikes)); // Save to localStorage
      return updatedLikes;
    });
  };

  return (
    <section className="top-picks">
       <div className="news-nav">
                    <button 
                        className="nav-btn" 
                        onClick={handlePrevious} 
                        disabled={startIndex === 0}
                    >
                        <i className="fas fa-chevron-left"></i> Previous
                    </button>

                    <button 
                        className="nav-btn" 
                        onClick={handleNext} 
                        disabled={startIndex + propertiesPerPage >= properties.length}
                    >
                        Next <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
      <div className="container">
        <div className="top-picks-header">
          
            <h2 className="top-picks-title">AashrayRealty top picks</h2>
            <p className="top-picks-subtitle">Explore top living options with us</p>
         
          
        </div>

        <div className="property-container">
          {visibleProperties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                {property.images?.length > 0 && (
                         <img className="imageConatiner" src={property.images[0].url} alt="Property" onClick={() => navigate(`/Properties/${property._id}`)} /> )}
                        <FaHeart className={`likeButton ${likedProperties[property._id] ? 'liked' : 'unliked'}`}
                            onClick={() => toggleLike(property._id)}/>
              </div>
              <div className="propertyproinfo">
                <div className="property-header">
                 
                  <h3 className="property-title">{property.propertyName}</h3>
                  <p className="ind-price">₹{property.discountPrice ? (
                                        <>
                                        <span className="strike">{property.price}</span> 
                                        <span className="discountprice">{property.discountPrice} {property.transactionType === "Rent" ? "/month" : ""}</span>
                                        </>
                                    ) : (
                                        <span className="originalprice">{property.price} {property.transactionType === "Rent" ? "/month" : ""}</span>
                                    )}
                                    </p>
                  
                   
                    
                  </div>
                 <div className="buytypeee">
                 <span className="property-type">{property.propertyType}</span>
                 <p className="price-per-sqft">For {property.transactionType}</p>
                 </div>
                  
                </div>
                <p className="property-location">{property.address} {property.area},{property.city}</p>
                <div className="property-details">
                  <span><i className="fas fa-bed"></i> {property.bedrooms}</span>
                  <span><i className="fas fa-vector-square"></i> {property.areaSqft}</span>
                 
                </div>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyList;
