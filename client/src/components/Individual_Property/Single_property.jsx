import './SingleProperty.css'
import { useEffect,  useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
// import Swipe from '../Swipe/swipe';
 import { FaBed, FaBath,  FaMapMarkerAlt ,FaRupeeSign, FaRulerCombined, FaBuilding, FaTag, FaCheckCircle, FaDumbbell, FaSwimmingPool, FaShieldAlt, FaCar, FaWifi, FaUtensils, FaBolt, FaUsers, FaPaw} from "react-icons/fa";
import MapDirection from '../Singlemap/MapDirection';

export default function Single_property() {
    const { id: propertyId } = useParams();
     const navigate=useNavigate();
     const [formData, setFormData] = useState({
          images:[],
          propertyName: '',
          propertyType: '',
          transactionType: '',
          areaSqft:0,
          desc:'',
          amenities:'',
          bedrooms: 0,
          bathrooms:0,
          price: 0,
          discountPrice:0,
          houseno:"",
          buildingName:'',
          streetName:'',
          area:'',
          city:'',
        });
        const amenityIcons = {
          "gym": <FaDumbbell className="icon" />,
          "swimming Pool": <FaSwimmingPool className="icon" />,
          "security": <FaShieldAlt className="icon" />,
          "parking": <FaCar className="icon" />,
          "wiFi": <FaWifi className="icon" />,
          "restaurant": <FaUtensils className="icon" />,
          "power Backup": <FaBolt className="icon" />,
          "clubhouse": <FaUsers className="icon" /> ,
          "pet friendly": <FaPaw className="icon" />,  // Dog/Pet-Friendly Icon
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
    <div className="maincontain">
      
      <div className="imagecontain">
                {formData.images?.length > 0 && (
                        <img
                         className='leftimage'
                          src={formData.images[0].url}
                          alt="Property"
                          onClick={()=>navigate(`/Properties/Swipe/${propertyId}`)}
                        />
                        
                      )}
                      <div className="rightside">
                      {formData.images?.length > 1 && (
                        <img
                         className='rightimage'
                          src={formData.images[1].url}
                          alt="Property"
                          onClick={()=>navigate(`/Properties/Swipe/${propertyId}`)}
                        />
                        
                      )}
                      {formData.images?.length > 2 && (
                        <img
                         className='rightsecimage'
                          src={formData.images[2].url}
                          alt="Property"
                          onClick={()=>navigate(`/Properties/Swipe/${propertyId}`)}
                        />
                        
                      )}
                      </div>
      </div>
     
        <div className="property-container">
        <h2 className="property-title">
        {formData.propertyName}
        </h2>
        <p className="property-type">
          <FaBuilding className="icon" /> {formData.propertyType}
        </p>
        <p className="property-transaction">
          <FaTag className="icon" /> {formData.transactionType}
        </p>
        
        <p className="property-area">
          <FaRulerCombined className="icon" /> {formData.areaSqft} sqft
        </p>
        <p className="property-price">
          <FaRupeeSign className="icon" /> <span className="original-price">{formData.price}</span> 
          <span className="discount-price"> {formData.discountPrice}</span>
        </p>
        <p className="property-description">Description: {formData.desc}</p>
      
      
      
       
          <p><FaBed className="icon" /> {formData.bedrooms} Bedrooms</p>
          <p><FaBath className="icon" /> {formData.bathrooms} Bathrooms</p>
        
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
         <p className="property-address">
          <FaMapMarkerAlt className="icon" /> {formData.houseno}, {formData.buildingName} {formData.streetName}, {formData.area}, {formData.city}
        </p>
        <div className="mapdirect">
          <MapDirection />
        </div>
      </div>
    </div>
    </>
    
  )
}

