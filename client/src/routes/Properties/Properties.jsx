import Map from '../../components/map/Map';
import { useState, useEffect } from 'react';
import './Properties.css';
import { useNavigate } from 'react-router-dom';
import {  FaMapMarkerAlt, FaRupeeSign, FaHeart } from "react-icons/fa";

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [likedProperties, setLikedProperties] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch("/api/property/all");
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    const toggleLike = (id) => {
        setLikedProperties(prev => ({
            ...prev,
            [id]: !prev[id] // Toggle like status
        }));
    };

    return (
        <div className="main-user-contain">
            <div className="datapro">
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div className="contain" key={property._id} onClick={() => navigate(`/Properties/${property._id}`)}
>
                            <div className="imageWrapper" >
                                {property.images?.length > 0 && (
                                    <img
                                        className="imageConatiner"
                                        src={property.images[0].url}
                                        alt="Property"
                                                                            />
                                )}
                                <FaHeart
                                    className={`likeButton ${likedProperties[property._id] ? 'liked' : 'unliked'}`}
                                    onClick={() => toggleLike(property._id)}
                                />
                            </div>

                            <div className="info">
                                <h3>{property.propertyName}</h3>
                                <div className="prodetails">
                                    <FaMapMarkerAlt />
                                    <p>{property.houseno} {property.buildingName} {property.streetName} {property.area} {property.city}</p>
                                </div>
                               <p className='protype'>{property.transactionType}</p>
                                <div className="price"><FaRupeeSign />{property.discountPrice}</div>
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
