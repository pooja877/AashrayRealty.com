import Map from '../../components/map/Map';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './Properties.css';
// import PropertySearch from "../../components/PropertySearch/PropertySearch";
import { useNavigate } from 'react-router-dom';
import {  FaMapMarkerAlt, FaHeart } from "react-icons/fa";

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [likedProperties, setLikedProperties] = useState({});
    const navigate = useNavigate();
    const location = useLocation(); 

    useEffect(() => {
        const fetchProperties = async () => {
            try {
              
                const response = await fetch(`/api/property/all${location.search}`);

                if (!response.ok) throw new Error("Failed to fetch properties");
        
                const data = await response.json();
                
                setProperties(data);
            } catch (error) {
                console.error("Error fetching properties:", error);
                setProperties([]);
            }
        };
        
        fetchProperties();
    }, [location.search]); 

    const toggleLike = (id) => {
        setLikedProperties((prev) => {
          const updatedLikes = { ...prev, [id]: !prev[id] };
          localStorage.setItem('likedProperties', JSON.stringify(updatedLikes));
          return updatedLikes;
        });
      };

    return (
        <div className="main-user-contain">
         
            <div className="datapro">
            {/* <PropertySearch/> */}
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div className="contain" key={property._id} 
>
                            <div className="imageWrapper" >
                                {property.images?.length > 0 && (
                                    <img
                                        className="imageConatiner"
                                        src={property.images[0].url}
                                        alt="Property"
                                        onClick={() => navigate(`/Properties/${property._id}`)}                                   />
                                )}
                                 <FaHeart
                                    className={`likeButton ${likedProperties[property._id] ? 'liked' : 'unliked'}`}
                                    onClick={() => toggleLike(property._id)}
                                />
                            </div>

                            <div className="info" onClick={() => navigate(`/Properties/${property._id}`)}>
                                <h3>{property.propertyName}</h3>
                                <div className="prodetails">
                                    <FaMapMarkerAlt />
                                    <p>{property.address} {property.area} {property.city}</p>
                                </div>
                               <p className='protype'>For {property.transactionType}</p>
                                     <div className="price">
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
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No properties found.</p>
                )}
            </div>
           

            <div className="mapall"><Map /></div>
        </div>
    );
}