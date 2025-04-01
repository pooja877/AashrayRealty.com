import "../PropertyList/PropertyList.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const TopRated = () => {
  const [properties, setProperties] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const propertiesPerPage = 3; 
  const navigate = useNavigate();
  const [likedProperties, setLikedProperties] = useState(new Set());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/api/property/top-rated-area");
        setProperties(res.data); // ✅ 3+ rating wali properties set kar raha hoon
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await fetch('/api/user/me', { method: 'GET', credentials: 'include' });
            const data = await res.json();
            if (res.ok) setUser(data);
        } catch (error) {
            console.error('Not logged in', error);
        }
    };
    fetchUser();
}, []);
  useEffect(() => {
        if (user) {
            const fetchLikedProperties = async () => {
                try {
                    const res = await fetch('/api/likes/liked', { credentials: 'include' });
                    const data = await res.json();
                    setLikedProperties(new Set(data.map(like => like.propertyId._id)));
                } catch (error) {
                    console.error('Error fetching liked properties:', error);
                }
            };
            fetchLikedProperties();
        }
    }, [user]);

    const toggleLike = async (propertyId) => {
      if (!user) {
          alert('Please login to like properties.');
          return;
      }
      try {
          if (likedProperties.has(propertyId)) {
              await fetch('/api/likes/unlike', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify({ propertyId })
              });
              setLikedProperties(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(propertyId);
                  return newSet;
              });
          } else {
              await fetch('/api/likes/like', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify({ propertyId })
              });
              setLikedProperties(prev => new Set(prev).add(propertyId));
          }
      } catch (error) {
          console.error('Error toggling like:', error);
      }
  };

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
          
            <h2 className="top-picks-title">AashrayRealty top picks By Area</h2>
            <p className="top-picks-subtitle">Explore top living options with us</p>
         
          
        </div>

        <div className="propertcontainer">
          {visibleProperties.map((property) => (
            <div key={property._id} className="property-card">
              <div className="property-image">
                {property.images?.length > 0 && (
                         <img className="imageConatiner" src={property.images[0].url} alt="Property" onClick={() => navigate(`/Properties/${property._id}`)} /> )}
                         <FaHeart
                                    className={`likeButton ${likedProperties.has(property._id) ? 'liked' : 'unliked'}`}
                                    onClick={() => toggleLike(property._id)}
                                />
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

export default TopRated;
