import './SingleProperty.css';
import { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { FaBed, FaBath,FaHeart, FaMapMarkerAlt, FaRupeeSign, FaRulerCombined, FaBuilding, FaTag, FaCheckCircle, FaDumbbell, FaSwimmingPool, FaShieldAlt, FaCar, FaWifi, FaUtensils, FaBolt, FaUsers, FaPaw, FaWater } from "react-icons/fa";
import MapDirection from '../Singlemap/MapDirection';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import ReviewCarousel from '../ReviewCarousel/ReviewCarousel';


export default function SingleProperty() {
    const { id: propertyId } = useParams();
    const [likedProperties, setLikedProperties] = useState({});
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
      images:[],
      propertyName: '',
      propertyType: '',
      transactionType: '',
      bhk:'',
      floor:'',
      areaSqft:0,
      furnished:'',
      desc:'',
      amenities:'',
      bedrooms: 0,
      bathrooms:0,
      price: 0,
      discountPrice:0,
      address:'',
      area:'',
      city:'',
    });
    

    const toggleLike = (id) => {
      // setLikedProperties(prev => ({
      //     ...prev,
      //     [id]: !prev[id] // Toggle like status
      // }));
      setLikedProperties(prev => {
        const updatedLikes = { ...prev, [id]: !prev[id] };
        localStorage.setItem("likedProperties", JSON.stringify(updatedLikes)); // Save in localStorage
        return updatedLikes;
    });
  };
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
      
     
      const storedLikes = JSON.parse(localStorage.getItem("likedProperties")) || {};
      setLikedProperties(storedLikes);
  }, [propertyId]);

 
    

    return (
        <>
         <div className="mainprocon">
         <div className="propertycontainer">
                {/* Left Section - Images */}
                {/* <div className="image-section">
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
                            onClick={()=>{
                              navigate(`/proeprties/swipe/${propertyId}`)
                            }}
                          />
                            <FaHeart className={`likeButton ${likedProperties[propertyId] ? 'liked' : 'unliked'}`}onClick={() => toggleLike(propertyId)}/>
                        </div>
                      </SwiperSlide>
                    ))}
                   
                  </Swiper>
                   
            </div> */}

<div className="image-gallery">
  {formData.images.length > 0 && (
    <div className="large-image">
      <img
        src={formData.images[0].url || formData.images[0]}
        alt="Property 1"
        className="property-slide"
        onClick={()=>{
          navigate(`/proeprties/swipe/${propertyId}`)
        }}
      />
      <FaHeart
        className={`likeButton ${likedProperties[propertyId] ? 'liked' : 'unliked'}`}
        onClick={() => toggleLike(propertyId)}
      />
    </div>
  )}

  <div className="small-images">
    {formData.images.slice(1, 3).map((item, index) => (
      <div key={index} className="small-image">
        <img
          src={item.url || item}
          alt={`Property ${index + 2}`}
          className="property-slide"
          onClick={()=>{
            navigate(`/proeprties/swipe/${propertyId}`)
          }}
        />
      </div>
    ))}
  </div>
</div>



           <div className="leftright">

            {/* left side */}
           <div className="property-leftside">

              <div className="infopro">
                
            {/* title & price */}
               <div className="titlePrice">
               <h2 className="property-title">{formData.propertyName}</h2>
                                  <p className="property-price">
                      <FaRupeeSign className="rupeeicon" /> 
                      {formData.discountPrice ? (
                        <>
                          <span className="strike">{formData.price}</span> 
                          <span className="discount-price">{formData.discountPrice} {formData.transactionType === "Rent" ? "/month" : ""}</span>
                        </>
                      ) : (
                        <span className="original-price">{formData.price} {formData.transactionType === "Rent" ? "/month" : ""}</span>
                      )}
                    </p>
               {/* <p className="property-price">
               <FaRupeeSign className="rupeeicon" /> <span className="original-price">{formData.discountPrice} {formData.transactionType === "Rent" ? "/month" : ""}</span> </p> */}
               </div>
               <div className="bathbedrooms">
                       <p><FaBed className="icon" /> {formData.bedrooms} Bedrooms</p>
          <p><FaBath className="icon" /> {formData.bathrooms} Bathrooms</p>
               </div>

               {/* types and sqrt area */}
            <div className="type-floor">
            <div className="typesqrt">
              
               
              <p className="property-type">
              <span className='hedpro'>Property Type</span>
        <span><FaBuilding className="icon" /> {formData.propertyType}</span> 
       </p>

       <p className="property-transaction">
       <span className='hedpro'>Selling Type</span>
        <span><FaTag className="icon" /> {formData.transactionType} </span> 
       </p>
       
       <p className="property-area">
       <span className='hedpro'>Area</span>
       <span> <FaRulerCombined className="icon" /> {formData.areaSqft} sqft</span>
       </p>

     
       </div>
       <div className="floorbhk">

       <p className="propertyfurnished">
       <span className='hedpro'>Furnished</span>
       <span> {formData.furnished}</span>
       </p>
       <p className="propertybhk">
       <span className='hedpro'> {formData.propertyType === "Residential" ?"" :  "BHk Configures"}</span>
       <span>  {formData.propertyType === "Residential" ? "" : `${formData.bhk}`}</span>
       </p>

       <p className="propertyfloor">
       <span className='hedpro'>{formData.propertyType === "Residential" ? "Total Floor" : "Floor"}</span>
       <span>{formData.propertyType === "Residential" ? `${formData.floor} `: `${formData.floor} Floor`} </span>
       </p>
       </div>
            </div>
               
               <div className="desc">
               <p>{formData.desc}</p>
               </div>
               </div>
             
      <button className='book-btn'>Book Property</button>
           

       </div>
    {/* Right Side*/}
           <div className="property-rightside">
           <div className="property-amenities">
          <h3>Amenities</h3>
          <hr />
          {formData.amenities.split(",").map((amenity, index) => {
            const key = amenity.trim().toLowerCase(); // Convert to lowercase
            return (
              <p key={index}>
                {amenityIcons[key] || <FaCheckCircle className="icon" />} {amenity.trim()}
              </p>
            );
          })}
        </div>

           <p className="propertylocation">  <FaMapMarkerAlt className="icon" /> {formData.address}, {formData.area}, {formData.city}</p>
             <div className="propertymap">
             <MapDirection />
             </div>
           </div>
           </div>
          <div className="reviewprocon">
          <button onClick={()=>{navigate(`/Review/${propertyId}`)}} className='giveratereviewbtn' >Give Review-Rating</button>
          <ReviewCarousel propertyId={propertyId} />
          </div>
            </div>
           
           
            
    </div>
 
        </>
    );
}

   
