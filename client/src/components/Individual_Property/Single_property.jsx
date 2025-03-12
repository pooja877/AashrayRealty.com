import './SingleProperty.css';
import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { FaBed, FaBath, FaMapMarkerAlt, FaRupeeSign, FaRulerCombined, FaBuilding, FaTag, FaCheckCircle, FaDumbbell, FaSwimmingPool, FaShieldAlt, FaCar, FaWifi, FaUtensils, FaBolt, FaUsers, FaPaw, FaWater } from "react-icons/fa";
import MapDirection from '../Singlemap/MapDirection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";

export default function SingleProperty() {
    const { id: propertyId } = useParams();
    
    const [formData, setFormData] = useState({
        images: [],
        propertyName: '',
        propertyType: '',
        transactionType: '',
        areaSqft: 0,
        desc: '',
        amenities: '',
        bedrooms: 0,
        bathrooms: 0,
        price: 0,
        discountPrice: 0,
        houseno: "",
        buildingName: '',
        streetName: '',
        area: '',
        city: '',
    });

    const amenityIcons = {
        "gym": <FaDumbbell className="icon" />,
        "swimming pool": <FaSwimmingPool className="icon" />,
        "security": <FaShieldAlt className="icon" />,
        "parking": <FaCar className="icon" />,
        "wifi": <FaWifi className="icon" />,
        "restaurant": <FaUtensils className="icon" />,
        "power backup": <FaBolt className="icon" />,
        "clubhouse": <FaUsers className="icon" />,
        "pet friendly": <FaPaw className="icon" />,
        "pet dog allow": <FaPaw className="icon" />,
        "24/7 water": <FaWater className="icon" />,
        "24 water": <FaWater className="icon" />,
        "dog park": <FaPaw className="icon" />,
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
    }, [propertyId]);

    return (
        <>
         <div className="propertycontainer">
                {/* Left Section - Images */}
                <div className="image-section">
                <Swiper
                    key={formData.images.length}
                    modules={[Navigation]}
                    navigation
                    // loop={formData.images.length > 1}
                    className="property-swiper">
                    {formData.images.map((item, index) => (
                      <SwiperSlide key={index} className="slide-container">
                        <div className="image-wrapper">
                          <img
                            src={item.url || item}
                            alt={`Property ${index + 1}`}
                            className="property-slide"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                   
            </div>

           <div className="leftright">

            {/* left side */}
           <div className="property-leftside">

            {/* title & price */}
               <div className="titlePrice">
               <h2 className="property-title">{formData.propertyName}</h2>
               <p className="property-price">
               <FaRupeeSign className="icon" /> <span className="original-price">{formData.price}</span> </p>
               </div>
               <div className="bathbedrooms">
                       <p><FaBed className="icon" /> {formData.bedrooms} Bedrooms</p>
          <p><FaBath className="icon" /> {formData.bathrooms} Bathrooms</p>
               </div>
               <div className="typesqrt">
               <p className="property-type">
          <FaBuilding className="icon" /> {formData.propertyType}
        </p>
        <p className="property-transaction">
          <FaTag className="icon" /> {formData.transactionType}
        </p>
        
        <p className="property-area">
          <FaRulerCombined className="icon" /> {formData.areaSqft} sqft
        </p>
               </div>
               <div className="desc">
               <p>{formData.desc}</p>
               </div>
      <button className='book-btn'>Book Property</button>

       </div>
    {/* Right Side*/}
           <div className="property-rightside">
           <div className="property-amenities">
          <h3>Amenities</h3>
          {formData.amenities.split(",").map((amenity, index) => {
            const key = amenity.trim().toLowerCase(); // Convert to lowercase
            return (
              <p key={index}>
                {amenityIcons[key] || <FaCheckCircle className="icon" />} {amenity.trim()}
              </p>
            );
          })}
        </div>

           <p className="propertylocation">  <FaMapMarkerAlt className="icon" /> {formData.houseno} {formData.buildingName} {formData.streetName}, {formData.area}, {formData.city}</p>
             <div className="propertymap">
             <MapDirection />
             </div>
           </div>
           </div>
            </div>
        </>
    );
}
{/* <div className="property-amenities">
<h3>Amenities</h3>
{formData.amenities.split(",").map((amenity, index) => {
    const key = amenity.trim().toLowerCase();
    return (
        <p key={index}>
            {amenityIcons[key] || <FaCheckCircle className="icon" />} {amenity.trim()}
        </p>
    );
})}
</div> */}

 {/* Left Side */}
//  <div className="property-text">
//  <div className="title-price">
//    <h2 className="property-title">{formData.propertyName}</h2>
//    <p className="property-price">
//                <FaRupeeSign className="icon" />
//                <span className="original-price">{formData.price}</span>
//                {formData.discountPrice > 0 && (
//                    <span className="discount-price"> {formData.discountPrice}</span>
//                )}
//            </p>
//  </div>
//   <div className="property-detail">
//   <span className="property-transaction"><FaTag className="icon" /> {formData.transactionType}</span>
//   <span className="property-area"><FaRulerCombined className="icon" /> {formData.areaSqft} sqft</span>
//   </div>
//  {/* Icons and Property Features */}
//  <div className="property-features">
//  <span><FaBuilding className="icon" /> <b>{formData.propertyType} </b></span>
//    <span><FaBath className="icon" /><b> {formData.bathrooms}</b>Bathrooms</span>
//    <span><FaBed className="icon" /><b> {formData.bedrooms}</b>Bedrooms</span>
//  </div>

//  {/* Description */}
//  <p className="property-description">
//   {formData.desc}
//  </p>
             
//     {/* Amenities Section */}
   
