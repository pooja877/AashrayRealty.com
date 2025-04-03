import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  FaHeart } from "react-icons/fa";
import "./UserApproveProperties.css";

const areaOptions = {
    Ahmedabad: [
        "Satellite", "Bopal", "Narol", "Navrangpura", "Maninagar",
        "Vastrapur", "Thaltej", "Naranpura", "Gota", "Prahlad Nagar",
        "Ashram Road", "Chandkheda", "Iscon", "Shahibaug", "Memnagar",
        "Jodhpur", "Ranip", "Ellis Bridge", "Paldi", "SG Highway"
      ],
      Gandhinagar: [
        "Sector 1", "Sector 7", "Sector 11", "Sector 21",
        "Sector 27", "Infocity", "Adalaj", "Kudasan",
        "Sargasan", "Pethapur"
      ]  
};

const UserApproveProperties = () => {
    const [properties, setProperties] = useState([]);
     const [likedProperties, setLikedProperties] = useState(new Set());
        const [user, setUser] = useState(null);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filters, setFilters] = useState({ city: "", price: "", type: "", bhk: "", transactionType: "", area: "" });
    const navigate = useNavigate();

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
        const fetchApprovedProperties = async () => {
            try {
                const response = await fetch("/api/userproperties/approved");
                const data = await response.json();
                setProperties(data);
                setFilteredProperties(data);
            } catch (error) {
                console.error("Error fetching approved properties:", error);
            }
        };
        fetchApprovedProperties();
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
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        let filtered = properties;

        if (filters.city) {
            filtered = filtered.filter((prop) => prop.city.toLowerCase() === filters.city.toLowerCase());
        }
        if (filters.area) {
            filtered = filtered.filter((prop) => prop.area === filters.area);
        }
        if (filters.price) {
            const [min, max] = filters.price.split("-").map(Number);
            filtered = filtered.filter((prop) => prop.price >= min && prop.price <= max);
        }
        if (filters.type) {
            filtered = filtered.filter((prop) => prop.propertyType.toLowerCase() === filters.type.toLowerCase());
        }
        if (filters.bhk) {
            filtered = filtered.filter((prop) => prop.bhk === filters.bhk);
        }
        if (filters.transactionType) {
            filtered = filtered.filter((prop) => prop.transactionType.toLowerCase() === filters.transactionType.toLowerCase());
        }

        setFilteredProperties(filtered);
    }, [filters, properties]);

    return (
        <div className="userapprove-container">
            <div className="userapprove-filter-box">
                <div className="userapprove-filters">
                    <select name="city" onChange={handleFilterChange} className="userapprove-select">
                        <option value="">🏙️ Select City</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                    </select>
                    
                    <select name="area" onChange={handleFilterChange} className="userapprove-select" disabled={!filters.city}>
                        <option value="">📍 Select Area</option>
                        {filters.city && areaOptions[filters.city].map((area) => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                    </select>

                    <select name="price" onChange={handleFilterChange} className="userapprove-select">
                        <option value="">💰 Select Price Range</option>
                        <option value="0-5000000">Below ₹50 Lakh</option>
                        <option value="5000000-10000000">₹50 Lakh - ₹1 Crore</option>
                        <option value="10000000-999999999">Above ₹1 Crore</option>
                    </select>

                    <select name="type" onChange={handleFilterChange} className="userapprove-select">
                        <option value="">🏠 Select Type</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Apartment">Apartment</option>
                    </select>
                    
                    <select name="bhk" onChange={handleFilterChange} className="userapprove-select">
                        <option value="">🛏️ Select BHK</option>
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                    </select>
                    
                    <select name="transactionType" onChange={handleFilterChange} className="userapprove-select">
                        <option value="">🔄 Select Transaction Type</option>
                        <option value="Buy">Buy</option>
                        <option value="Rent">Rent</option>
                    </select>
                </div>
            </div>
             <div className="userpromaintab">
            <div className="propertcontainer">
                {filteredProperties.length > 0 ? (
                                    filteredProperties.map(property => (
                            //             <div className="contain" key={property._id}>
                            //                 <div className="imageWrapper">
                                                
                            //                 <img src={property.images[0]} alt={property.title} className="userapprove-image" />
                            //                     <FaHeart
                            //                         className={`likeButton ${likedProperties.has(property._id) ? 'liked' : 'unliked'}`}
                            //                         onClick={() => toggleLike(property._id)}
                            //                     />
                            //                 </div>
                            //                 <div className="info" onClick={() => navigate(`/Properties/${property._id}`)}>
                            //                     <h3>{property.title}</h3>
                            //                     <div className="prodetails">
                            //                         <FaMapMarkerAlt />
                            //                         <p>{property.address} {property.area} {property.city}{property.pincode}</p>
                            //                     </div>
                            //                     <p className='protype'>For {property.transactionType}</p>
                            //                     <div className="price">
                                                   
                            //  <span className="originalprice"><FaRupeeSign/>{property.price} {property.transactionType === "Rent" ? "/month" : ""}</span>
   
                            //                     </div>
                            //                 </div>
                            //             </div>
                            <div key={property._id} className="property-card">
                                          <div className="property-image">
                                            {property.images?.length > 0 && (
                                                      <img src={property.images[0]} alt={property.title} className="imageConatiner"  onClick={() => navigate(`/userproperties/${property._id}`)} />  )}
                                                     <FaHeart
                          className={`likeButton ${likedProperties.has(property._id) ? 'liked' : 'unliked'}`}
                               onClick={() => toggleLike(property._id)}
                                    />
                                          </div>
                                          <div className="propertyproinfo">
                                            <div className="property-header">
                                             
                                              <h3 className="property-title">{property.title}</h3>
                                              <p className="ind-price">₹
                                                                    <span className="originalprice">{property.price} {property.transactionType === "Rent" ? "/month" : ""}</span>
                                                              
                                                                </p>
                                              
                                               
                                                
                                              </div>
                                             <div className="buytypeee">
                                             <span className="property-type">{property.propertyType}</span>
                                             <p className="price-per-sqft">For {property.transactionType}</p>
                                             </div>
                                              
                                            </div>
                                            <p className="property-location">{property.address} {property.area},{property.city} {property.pincode}</p>
                                            <div className="property-details">
                                              <span><i className="fas fa-bed"></i> {property.bhk}</span>
                                              
                                             
                                            </div>
                                         
                                        </div>
                                    ))
                                ) : (
                                    <p>No properties found.</p>
                                )}
            </div>
            </div>
        </div>
    );
};

export default UserApproveProperties;
