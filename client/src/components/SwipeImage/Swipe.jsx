import './Swipe.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

export default function Swipe() {
    const { id: propertyId } = useParams();
    const [likedProperties, setLikedProperties] = useState({});
    const [formData, setFormData] = useState({ images: [] });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const toggleLike = (id) => {
        setLikedProperties(prev => {
            const updatedLikes = { ...prev, [id]: !prev[id] };
            localStorage.setItem("likedProperties", JSON.stringify(updatedLikes));
            return updatedLikes;
        });
    };

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await fetch(`/api/property/${propertyId}`);
                const data = await res.json();
                if (res.ok) {
                    setFormData(data);
                } else {
                    console.error("Property not found");
                }
            } catch (error) {
                console.error("Error fetching property:", error);
            }
        };
        fetchProperty();

        const storedLikes = JSON.parse(localStorage.getItem("likedProperties")) || {};
        setLikedProperties(storedLikes);

        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [propertyId]);

    return (
        <div className="mainimage">
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
                                    className={`likeButton ${likedProperties[propertyId] ? 'liked' : 'unliked'}`}
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
                                        className={`likeButton ${likedProperties[propertyId] ? 'liked' : 'unliked'}`}
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
