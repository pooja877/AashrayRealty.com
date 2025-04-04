import './Swipe.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from "swiper/modules";
import { FaHeart, FaTimes } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

export default function Swipe() {
    const { id: propertyId } = useParams();
    const [user, setUser] = useState(null);
    const [likedProperties, setLikedProperties] = useState(new Set());
    const [formData, setFormData] = useState({ images: [],
        propertyName:"",
        transactionType:"",
     });
       const navigate=useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
        const fetchProperty = async () => {
            try {
                // const res = await fetch(`/api/property/${propertyId}`);
                // const data = await res.json();
             
                // if (res.ok) {
                //     setFormData(data);
                // } else {
                //     console.error("Property not found");
                // }
                  // Try fetching from residential first
            let res = await fetch(`/api/property/${propertyId}`);
            let data = await res.json();

            // If residential not found, try commercial
            if (!res.ok || !data) {
                res = await fetch(`/api/userproperties/pro/${propertyId}`);
                data = await res.json();
            }

            if (res.ok && data) {
                setFormData(data);
            } else {
                console.error("Property not found in both collections");
            }
            } catch (error) {
                console.error("Error fetching property:", error);
            }
        };
        fetchProperty();

       
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [propertyId]);

    

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

    return (
        <div className="mainimage">
              <div className="propertyswipeinfo">
                 {/* Top Right - Close Button */}
            <FaTimes className="close-button" onClick={() => navigate(-1)} />
            </div>

           
            <div className="imagesection">
                {isMobile ? (
                    
                    <div className="mobile-view">
                        {formData.images.map((item, index) => (
                            <div key={index} className="mobile-image-wrapper">
                                <img
                                    src={item.url || item}
                                    alt={`Property ${index + 1}`}
                                    className="mobile-property-image"
                                />
                                 <FaHeart
                                className={`likeButton ${likedProperties.has(propertyId) ? 'liked' : 'unliked'}`}
                                onClick={() => toggleLike(propertyId)}
                                />
                            </div>
                        ))}
                      
                    </div>
                    
                ) : (
                    <Swiper
                        key={formData.images.length}
                        modules={[Navigation]}
                        navigation
                        className="property-swiper"
                    >
                        {formData.images.map((item, index) => (
                            <SwiperSlide key={index} className="slide-container">
                                <div className="image-wrapper">
                                    <img
                                        src={item.url || item}
                                        alt={`Property ${index + 1}`}
                                        className="propertyslide"
                                    />
                                     <FaHeart
                                className={`likeButton ${likedProperties.has(propertyId) ? 'liked' : 'unliked'}`}
                                onClick={() => toggleLike(propertyId)}
                                />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
}
