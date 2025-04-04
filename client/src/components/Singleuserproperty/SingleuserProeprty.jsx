import '../Individual_Property/SingleProperty.css';
import './SingleuserProperty.css'
import { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt, FaRupeeSign, FaBuilding, FaTag, FaCheckCircle, FaDumbbell, FaSwimmingPool, FaShieldAlt, FaCar, FaWifi, FaUtensils, FaBolt, FaUsers, FaPaw, FaWater, FaWhatsapp } from "react-icons/fa";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import Footercompo from '../Footer/Footercompo';
import UserPromap from '../Singlemap/UserPromap';


export default function SingleuserProeprty() {
    const { id: propertyId } = useParams();
    const [likedProperties, setLikedProperties] = useState(new Set());
    const [user, setUser] = useState(null);
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
      title: "",
      bhk: "",
      price: "",
      city: "",
      area: "",
      address: "",
      pincode: "",
      images: [],
      amenities: "",
      propertyType: "",
      transactionType: "",
     
    });
    
    useEffect(() => {
      const fetchUser = async () => {
          try {
              const res = await fetch('/api/user/me', { method: 'GET', credentials: 'include' });
              const data = await res.json();
              console.log(data);
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
    const handleWhatsappClick = () => {
      if (user?.mobile) {
        const phoneNumber = user.mobile;
        const message = `Hello, I am coming from AashrayRealty website regarding the property "${formData.title}".`;
        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/91${phoneNumber}?text=${encodedMsg}`, '_blank');
      } else {
        alert("WhatsApp number not available.");
      }
    };
    

    useEffect(() => {
      const fetchProperty = async () => {
          try {
              const res = await fetch(`/api/userproperties/pro/${propertyId}`);
              const data = await res.json();
              // console.log(data);
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
       
         <div className="mainprocon">
         <div className="propertycontainer">

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
      className={`likeButton ${likedProperties.has(propertyId) ? 'liked' : 'unliked'}`}
      onClick={() => toggleLike(propertyId)}/>
    </div>
  )}

  <div className="small-images">
    {formData.images.slice(1, 4).map((item, index) => (
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
               <h2 className="property-title">{formData.title}</h2>
                                  <p className="property-price">
                      <FaRupeeSign className="rupeeicon" /> 
                     
                    
                        <span className="original-price">{formData.price} {formData.transactionType === "Rent" ? "/month" : ""}</span>
                    
                    </p>
               {/* <p className="property-price">
               <FaRupeeSign className="rupeeicon" /> <span className="original-price">{formData.discountPrice} {formData.transactionType === "Rent" ? "/month" : ""}</span> </p> */}
               </div>
               {user && (
  <div className="userInfo">
    <h3 className="hedpro">Owner Information</h3>
    <div className="userinfo-card">
      <img src={user.avatar} alt="User Avatar" className="user-avatar" />
      <div className="user-details">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> +91 {user.mobile || "N/A"}</p>
      
      </div>
      <button className="whatsapp-btn" onClick={handleWhatsappClick}>
  <FaWhatsapp className="whatsapp-icon" />
</button>

    </div>
  </div>
)}
           <hr/>

               {/* types and sqrt area */}
            <div className="type-floor" style={{width:"fit-content",paddingRight:"1rem"}}>
            <div className="typesqrt">
              
               
              <p className="property-type">
              <span className='hedpro'>Property Type</span>
        <span><FaBuilding className="icon" /> {formData.propertyType}</span> 
       </p>

       <p className="property-transaction">
       <span className='hedpro'>Selling Type</span>
        <span><FaTag className="icon" /> {formData.transactionType} </span> 
       </p>
       

     
       </div>
       <div className="floorbhk">
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
               <p> <b>Description: </b>{formData.desc}</p>
               </div>
               </div>
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

           <p className="propertylocation">  <FaMapMarkerAlt className="icon" /> {formData.address}, {formData.area}, {formData.city} {formData.pincode}</p>
             <div className="propertymap">
             <UserPromap />
             </div>
           </div>
          
           </div>
         
         
          


        
            </div>
           
            <Footercompo/>    
    </div>
    
        
    );
}

   
